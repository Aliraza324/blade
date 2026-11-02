import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#08090D] text-white selection:bg-[#FF202D] selection:text-white">
        {/* Global Navigation Header */}
        <Header />

        {/* Dynamic Route Pages */}
        <div className="flex-1">
          <AppRoutes />
        </div>

        {/* Global Footer */}
        <Footer />

        {/* Slide-out Cart Drawer */}
        <CartDrawer />

        {/* Toast Notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#171B25',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              fontSize: '12px',
              borderRadius: '12px'
            }
          }}
        />
      </div>
    </BrowserRouter>
  );
}
