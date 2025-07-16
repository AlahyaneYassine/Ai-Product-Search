const express = require('express');
const router = express.Router();
const Selection = require('../models/Selection');
const authenticate = require('../middleware/authenticate'); // tu l'as déjà

// Récupérer les produits sélectionnés
router.get('/', authenticate, async (req, res) => {
  try {
    const selection = await Selection.findOne({ userId: req.userId });
    res.json(selection?.products || []);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Sauvegarder les produits sélectionnés
router.post('/', authenticate, async (req, res) => {
  try {
    const { products } = req.body;

    let selection = await Selection.findOne({ userId: req.userId });
    if (!selection) {
      selection = new Selection({ userId: req.userId, products });
    } else {
      selection.products = products;
    }

    await selection.save();
    res.status(200).json({ message: 'Sélection enregistrée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l’enregistrement' });
  }
});

module.exports = router;
