// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import HowItWorks from './how-it-works';
import Features from './features';
import Profile from './Profile';
import Pricing from './pricing';
import FAQ from './Faq';
import ForgotPassword from './forgot-password';
import PrivacyPolicy from './Privacy-policy';

import Electronics from './Categories/electronics';
import Automotive from './Categories/Automotive';

import SearchPage from './components/SearchPage';  // <-- Import SearchPage ici

import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

import { ProductsProvider } from './contexts/ProductsContext';
import { SelectionProvider } from './contexts/SelectionContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SelectionProvider>
          <ProductsProvider>
            <Routes>
              <Route path="/" element={<PublicRoute><Signup /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/categories/electronics" element={<Electronics />} />
              <Route path="/categories/automotive" element={<Automotive />} />


              {/* Route ajoutée pour SearchPage */}
              <Route path="/search" element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              } />

              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
          </ProductsProvider>
        </SelectionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
