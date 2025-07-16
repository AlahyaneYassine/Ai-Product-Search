import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onSelect, isSelected }) => {
  const [filter, setFilter] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Styles constants
  const styles = {
    container: {
      margin: '24px 0',
    },
    controlsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      flexWrap: 'wrap',
      gap: '16px',
    },
    filterGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#4B5563',
    },
    select: {
      padding: '8px 12px',
      borderRadius: '6px',
      border: '1px solid #D1D5DB',
      backgroundColor: 'white',
      fontSize: '14px',
      color: '#374151',
      cursor: 'pointer',
      transition: 'all 0.2s',
      ':hover': {
        borderColor: '#9CA3AF',
      },
      ':focus': {
        outline: 'none',
        borderColor: '#6366F1',
        boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
      },
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '32px',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      flexWrap: 'wrap',
    },
    paginationButton: {
      padding: '8px 12px',
      backgroundColor: 'white',
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      color: '#4B5563',
      cursor: 'pointer',
      transition: 'all 0.2s',
      ':hover': {
        backgroundColor: '#F3F4F6',
      },
      ':disabled': {
        opacity: '0.5',
        cursor: 'not-allowed',
      },
    },
    activePage: {
      backgroundColor: '#6366F1',
      color: 'white',
      borderColor: '#6366F1',
      ':hover': {
        backgroundColor: '#4F46E5',
      },
    },
    pageInfo: {
      fontSize: '14px',
      color: '#6B7280',
      margin: '0 12px',
    },
  };

  // Parse product price consistently
  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    const parsed = parseFloat(price.toString().replace(/[^\d.,]/g, '').replace(',', '.'));
    return isNaN(parsed) ? 0 : parsed;
  };

  // Sort products based on selected filter
  const sortedProducts = [...products].sort((a, b) => {
    switch (filter) {
      case 'price-asc':
        return parsePrice(a.price) - parsePrice(b.price);
      case 'price-desc':
        return parsePrice(b.price) - parsePrice(a.price);
      case 'rating':
        return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
      case 'alpha-asc':
        return a.name.localeCompare(b.name);
      case 'alpha-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Optimized pagination buttons rendering
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const visiblePages = 5; // Number of visible page buttons
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    return (
      <div style={styles.pagination}>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          style={styles.paginationButton}
          aria-label="First page"
        >
          «
        </button>
        
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={styles.paginationButton}
          aria-label="Previous page"
        >
          ‹
        </button>

        {startPage > 1 && (
          <span style={styles.pageInfo}>...</span>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                ...styles.paginationButton,
                ...(page === currentPage ? styles.activePage : {}),
              }}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          );
        })}

        {endPage < totalPages && (
          <span style={styles.pageInfo}>...</span>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={styles.paginationButton}
          aria-label="Next page"
        >
          ›
        </button>
        
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          style={styles.paginationButton}
          aria-label="Last page"
        >
          »
        </button>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Controls section */}
      <div style={styles.controlsContainer}>
        <div style={styles.filterGroup}>
          <label htmlFor="filter" style={styles.label}>
            Sort by:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            style={styles.select}
          >
            <option value="price-asc">Ascending Price</option>
            <option value="price-desc">Descending Price</option>
            <option value="rating"> Best Rated </option>
            <option value="alpha-asc">Product Name (A-Z)</option>
            <option value="alpha-desc">Product Name (Z-A)</option>
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label htmlFor="itemsPerPage" style={styles.label}>
            Display:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            style={styles.select}
          >
            <option value={8}>8 Products</option>
            <option value={12}>12 Products</option>
            <option value={24}>24 Products</option>
            <option value={48}>48 Products</option>
          </select>
        </div>
      </div>

      {/* Products grid */}
      <div style={styles.grid}>
        {paginatedProducts.map((product, index) => (
          <ProductCard
            key={`${product.product_url}-${index}`}
            product={product}
            onSelect={onSelect}
            isSelected={isSelected(product)}
          />
        ))}
      </div>

      {/* Pagination */}
      {renderPagination()}

      {/* Page info */}
      {products.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '16px', color: '#6B7280', fontSize: '14px' }}>
          Products {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedProducts.length)} sur {sortedProducts.length} Display
        </div>
      )}
    </div>
  );
};

export default ProductList;