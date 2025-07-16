// SelectionContext.js
import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../AuthContext';

const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const { isAuthenticated, token } = useContext(AuthContext);

  // Initialise depuis localStorage si non connecté, sinon vide (on chargera API)
  const [selectedProducts, setSelectedProducts] = useState(() => {
    if (typeof window !== 'undefined' && !isAuthenticated) {
      const local = localStorage.getItem('selectedProducts');
      if (local) {
        try {
          return JSON.parse(local);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  const [loadingSelection, setLoadingSelection] = useState(true);
  const saveTimeoutRef = useRef(null);

  // Chargement de la sélection depuis API si connecté
  useEffect(() => {
    if (isAuthenticated && token) {
      setLoadingSelection(true);
      fetch('/api/selections', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          if (!res.ok) throw new Error('Erreur chargement sélection API');
          return res.json();
        })
        .then(data => {
          console.log('[SelectionContext] Chargement API:', data);
          setSelectedProducts(Array.isArray(data) ? data : []);
        })
        .catch(err => {
          console.error('[SelectionContext] Erreur chargement API, fallback localStorage:', err);
          const local = localStorage.getItem('selectedProducts');
          if (local) {
            try {
              setSelectedProducts(JSON.parse(local));
            } catch {
              setSelectedProducts([]);
            }
          }
        })
        .finally(() => setLoadingSelection(false));
    } else {
      // Pas connecté : fin de chargement immédiate (localStorage déjà lu en init)
      setLoadingSelection(false);
    }
  }, [isAuthenticated, token]);

  // Sauvegarde avec debounce (500ms) dans API ou localStorage
  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(() => {
      if (isAuthenticated && token) {
        fetch('/api/selections', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ products: selectedProducts }),
        }).catch(err => console.error('[SelectionContext] Erreur sauvegarde API:', err));
      } else {
        try {
          localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
          console.log('[SelectionContext] Sauvegarde localStorage:', selectedProducts);
        } catch (err) {
          console.error('[SelectionContext] Erreur sauvegarde localStorage:', err);
        }
      }
    }, 500);

    return () => clearTimeout(saveTimeoutRef.current);
  }, [selectedProducts, isAuthenticated, token]);

  return (
    <SelectionContext.Provider value={{ selectedProducts, setSelectedProducts, loadingSelection }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => useContext(SelectionContext);
