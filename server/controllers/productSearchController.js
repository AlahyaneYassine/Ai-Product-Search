require('dotenv').config();
const { CohereClient } = require("cohere-ai");

// Vérification stricte de la configuration
if (!process.env.COHERE_API_KEY) {
  throw new Error("COHERE_API_KEY manquante dans le fichier .env");
}

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY
});

exports.searchAIProducts = async (req, res) => {
  let keyword = '';

  try {
    const { category } = req.params;
    keyword = req.query.keyword;

    // ===== VALIDATION DES ENTREES =====
    if (!keyword || keyword.length < 2) {
      return res.status(400).json({
        error: "Le mot-clé doit contenir au moins 2 caractères",
        received: keyword
      });
    }

    const validCategories = ['electronics', 'automotive', 'transportation', 'office'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        error: "Catégorie non valide",
        received: category,
        validCategories
      });
    }

    // ===== CONSTRUCTION DU PROMPT =====
    const prompt = `[INSTRUCTION STRICTE]
Génère un tableau JSON de 15 produits réels pour "${keyword}" (catégorie: ${category}).
Chaque produit doit avoir EXACTEMENT ces champs :
- name (string)
- price (string avec devise)
- description (string < 80 caractères)
- rating (number 0-5)
- supplier (string)
- product_url (URL valide)
- image_url (URL valide)
- quantity (number 1-20)

Format REQUIS :
```json
[
  {
    "name": "Nom produit",
    "price": "XX.XX€",
    "description": "Description courte",
    "rating": 4.5,
    "supplier": "Amazon",
    "product_url": "https://example.com",
    "image_url": "https://example.com/image.jpg",
    "quantity": 5
  }
]```

Ne renvoie QUE le JSON sans aucun texte supplémentaire.`;

    // ===== APPEL A L'API COHERE =====
    console.log("Envoi de la requête à Cohere...");
    const response = await cohere.generate({
      model: "command-r-plus",
      prompt: prompt,
      temperature: 0.3, // Réduit la créativité pour un JSON strict
      maxTokens: 2500,
    });

    const rawText = response.generations[0]?.text?.trim();
    console.log("Réponse brute de Cohere:", rawText);

    // ===== TRAITEMENT DE LA REPONSE =====
    let products;
    try {
      // Extraction du JSON uniquement
      const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : rawText;
      
      products = JSON.parse(jsonStr);
      
      if (!Array.isArray(products)) {
        throw new Error("La réponse n'est pas un tableau");
      }
    } catch (e) {
      console.error("Erreur de parsing:", e);
      console.debug("Contenu brut:", rawText);
      throw new Error(`Format JSON invalide: ${e.message}`);
    }

    // ===== VALIDATION ET TRANSFORMATION =====
    const processedProducts = products
      .filter(product => (
        product?.name &&
        product?.price && 
        product?.description &&
        !isNaN(product?.rating) &&
        product?.product_url?.startsWith('http') &&
        product?.image_url?.startsWith('http')
      ))
      .slice(0, 15)
      .map(product => ({
        ...product,
        rating: parseFloat(product.rating).toFixed(1),
        // Si quantity n'est pas fournie, génère une valeur aléatoire
        quantity: product.quantity || Math.floor(Math.random() * 10) + 1
      }));

    if (processedProducts.length === 0) {
      throw new Error("Aucun produit valide trouvé dans la réponse");
    }

    // ===== REPONSE FINALE =====
    return res.json({
      success: true,
      count: processedProducts.length,
      products: processedProducts
    });

  } catch (error) {
    console.error("[ERREUR FINALE]", error.message);
    
    // Mode dégradé avec mock
    const mockProducts = [{
      name: `${keyword || 'Produit'} (exemple)`,
      price: "99.99€",
      description: "Produit de démonstration - erreur API",
      rating: 4.0,
      supplier: "Amazon",
      product_url: "https://www.amazon.fr",
      image_url: "https://via.placeholder.com/150",
      quantity: 1
    }];

    return res.status(500).json({
      error: "Erreur API - Mode démo activé",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      products: mockProducts
    });
  }
};