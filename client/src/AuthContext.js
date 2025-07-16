import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // 👈 nouveau

  useEffect(() => {
    const savedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);

      // ✅ Appel API pour récupérer les infos de l'utilisateur connecté
      fetch('http://localhost:5000/api/profile/me', {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load user profile');
          return res.json();
        })
        .then((data) => {
          setUser(data); // 👈 stocker infos utilisateur
        })
        .catch(() => {
          setToken(null);
          setIsAuthenticated(false);
        });
    }

    setLoading(false);
  }, []);

  const login = (newToken, rememberMe = false) => {
    if (rememberMe) {
      localStorage.setItem('token', newToken);
      sessionStorage.removeItem('token');
    } else {
      sessionStorage.setItem('token', newToken);
      localStorage.removeItem('token');
    }
    setToken(newToken);
    setIsAuthenticated(true);

    // 🟡 Optionnel : re-fetch user after login
    fetch('http://localhost:5000/api/profile/me', {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    })
      .then((res) => res.json())
      .then(setUser)
      .catch(console.error);
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    setUser(null); // 👈 clear user
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
