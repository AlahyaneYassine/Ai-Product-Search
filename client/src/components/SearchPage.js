import React from 'react';
import ProductList from './ProductList';
import { useSelection } from '../contexts/SelectionContext';

const SearchPage = ({ products, searchQuery }) => {
  const { selectedProducts, setSelectedProducts } = useSelection();

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '24px',
      position: 'relative',
    },
    header: {
      marginBottom: '32px',
    },
    title: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#111827',
      margin: '0 0 8px 0',
    },
    resultsCount: {
      fontSize: '16px',
      color: '#6B7280',
    },
    cartButton: {
      position: 'fixed',
      top: '120px',
      right: '40px',
      backgroundColor: '#ffffff',
      border: '1px solid #E5E7EB',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.2s ease',
      zIndex: 100,
      ':hover': {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transform: 'translateY(-2px)'
      }
    },
    cartIcon: {
      fontSize: '24px',
      position: 'relative',
    },
    cartBadge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      backgroundColor: '#EF4444',
      color: 'white',
      borderRadius: '50%',
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
    },
    cartTooltip: {
      position: 'absolute',
      right: '70px',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: '#1F2937',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '14px',
      whiteSpace: 'nowrap',
      opacity: 0,
      transition: 'opacity 0.2s ease',
      pointerEvents: 'none',
      '::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        right: '-5px',
        transform: 'translateY(-50%)',
        borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: 'transparent transparent transparent #1F2937',
      }
    },
  };

  const handleSelect = (product) => {
    if (!product?.product_url) {
      console.error('Product is missing required product_url', product);
      return;
    }

    const isSelected = selectedProducts.some(p => p.product_url === product.product_url);
    
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter(p => p.product_url !== product.product_url));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const isProductSelected = (product) => {
    return selectedProducts.some(p => p.product_url === product.product_url);
  };

  const handleCartHover = (e) => {
    // Implémentez le hover si nécessaire
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          {searchQuery ? `Résultats pour "${searchQuery}"` : 'Tous les produits'}
        </h2>
       <div style={styles.resultsCount}>
  {products?.length || 0} {products?.length > 1 ? 'produits trouvés' : 'produit trouvé'}
</div>

      </div>

      <ProductList
        products={products}
        onSelect={handleSelect}
        isSelected={isProductSelected}
      />

      {/* Bouton panier flottant */}
      {selectedProducts.length > 0 && (
        <div 
          style={styles.cartButton}
          onMouseEnter={handleCartHover}
          onClick={() => console.log('Voir le panier')} // À remplacer par votre logique
        >
          <div style={styles.cartIcon}>
            🛒
            <div style={styles.cartBadge}>{selectedProducts.length}</div>
          </div>
          <div style={styles.cartTooltip}>Voir votre sélection</div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;