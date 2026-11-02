import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Compass,
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, openCartDrawer } = useCartStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const totalItemsCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Configurator', path: '/configurator', highlight: true },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08090D]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group min-w-0">
          {/* Red logo mark */}
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-[#FF202D] rounded-lg group-hover:scale-105 transition-transform shadow-md shadow-[#FF202D]/30" />
            <span className="relative text-white font-black text-sm sm:text-lg italic tracking-tighter">
              TT
            </span>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-sm sm:text-lg font-black tracking-wider text-white whitespace-nowrap">
                TT Blade <span className="text-[#FF202D]">Pro</span>
              </span>
            </div>
            <span className="hidden sm:block text-[10px] tracking-widest uppercase text-white/40 font-medium whitespace-nowrap">
              Customize • Play • Win
            </span>
          </div>
        </Link>

        {/* Center Navigation Links matching reference */}
        <nav className="hidden md:flex items-center gap-1 bg-[#11141C]/80 px-2 py-1.5 rounded-full border border-white/10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#FF202D] text-white shadow-md shadow-[#FF202D]/20'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Search, Account, & Cart */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center relative w-56"
          >
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-full bg-[#11141C] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF202D] transition-colors"
            />
          </form>

          {/* User Account Button (hidden on <sm to prevent overflow on 320px screens, available in mobile drawer) */}
          <Link
            to="/shop"
            title="Account & Favorites"
            className="hidden sm:flex p-2 rounded-full bg-[#11141C] hover:bg-[#171B25] text-white/70 hover:text-white border border-white/10 transition-colors"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Cart Icon with Live Item Count Badge */}
          <button
            onClick={openCartDrawer}
            title="Shopping Cart"
            className="relative p-1.5 sm:p-2 rounded-full bg-[#11141C] hover:bg-[#171B25] text-white/70 hover:text-white border border-white/10 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FF202D] text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center shadow-lg shadow-[#FF202D]/40 animate-pulse">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-1.5 sm:p-2 rounded-xl bg-[#11141C] text-white/70 hover:text-white border border-white/10"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0D0F17] border-b border-white/10 px-4 sm:px-6 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-3">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#171B25] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none"
            />
          </form>

          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#FF202D] text-white'
                    : 'text-white/80 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Mobile Account & Cart Quick Action Links */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <Link
              to="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 px-3 rounded-xl bg-white/5 text-white/80 hover:text-white"
            >
              <User className="w-4 h-4 text-[#FF202D]" />
              <span>My Account</span>
            </Link>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openCartDrawer();
              }}
              className="flex items-center gap-2 py-2 px-3 rounded-xl bg-white/5 text-white/80 hover:text-white"
            >
              <ShoppingCart className="w-4 h-4 text-[#FF202D]" />
              <span>Cart ({totalItemsCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

