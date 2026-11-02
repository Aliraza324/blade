import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/Home/HomePage';
import { ShopPage } from '../pages/Shop/ShopPage';
import { ConfiguratorPage } from '../pages/Configurator/ConfiguratorPage';
import { ProductDetailsPage } from '../pages/ProductDetails/ProductDetailsPage';
import { CartPage } from '../pages/Cart/CartPage';
import { CheckoutPage } from '../pages/Checkout/CheckoutPage';
import { AboutPage } from '../pages/About/AboutPage';
import { ContactPage } from '../pages/Contact/ContactPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/configurator" element={<ConfiguratorPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

