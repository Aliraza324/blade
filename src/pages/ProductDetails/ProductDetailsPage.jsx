import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  Sliders,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  TreePine,
  Feather
} from 'lucide-react';
import toast from 'react-hot-toast';
import { FEATURED_PRODUCTS } from '../../data/products';
import { useConfiguratorStore } from '../../store/configuratorStore';
import { useCartStore } from '../../store/cartStore';
import { formatCurrency } from '../../utils/pricing';

export function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = FEATURED_PRODUCTS.find((p) => p.id === id) || FEATURED_PRODUCTS[0];

  const { applyPresetProduct } = useConfiguratorStore();
  const { addItem, openCartDrawer } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');

  const handleCustomize = () => {
    applyPresetProduct(product);
    navigate('/configurator');
  };

  const handleAddToCart = () => {
    addItem({
      configurationId: `${product.id}-${Date.now().toString().slice(-4)}`,
      name: product.name,
      subtitle: product.subtitle,
      quantity,
      unitPrice: product.configuredPrice,
      customizationCost: product.configuredPrice - product.basePrice,
      estimatedWeight: product.weight,
      thumbnail: product.image
    });
    openCartDrawer();
    toast.success(`${quantity}x ${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back navigation */}
        <button
          onClick={() => navigate('/shop')}
          className="text-xs text-white/50 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </button>

        {/* Main Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Gallery (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl bg-[#11141C] border border-white/10 p-10 flex items-center justify-center min-h-[460px] overflow-hidden group">
              <span className="absolute top-6 left-6 px-3 py-1 rounded-full bg-[#FF202D]/15 text-[#FF202D] border border-[#FF202D]/30 text-xs font-bold">
                {product.badge}
              </span>

              <img
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.src = '/images/products/tt-hinoki-pro.jpg';
                }}
                className="max-h-[380px] w-full object-cover rounded-2xl filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute bottom-6 right-6">
                <button
                  onClick={handleCustomize}
                  className="px-4 py-2 rounded-xl bg-black/60 hover:bg-[#FF202D] text-white text-xs font-bold backdrop-blur-md border border-white/10 flex items-center gap-2 transition-all shadow-xl"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Inspect in 3D Configurator</span>
                </button>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-[#171B25] border border-white/5 text-center">
                <span className="text-[10px] uppercase text-white/40 font-bold block">Elasticity</span>
                <span className="text-sm font-bold text-white mt-1 block">{product.stiffness}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#171B25] border border-white/5 text-center">
                <span className="text-[10px] uppercase text-white/40 font-bold block">Thickness</span>
                <span className="text-sm font-bold text-white mt-1 block">{product.thickness}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#171B25] border border-white/5 text-center">
                <span className="text-[10px] uppercase text-white/40 font-bold block">Average Weight</span>
                <span className="text-sm font-bold text-emerald-400 mt-1 block">{product.weight} g</span>
              </div>
            </div>
          </div>

          {/* Right Product Buy Box (Cols 8-12) */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#171B25] border border-white/10 space-y-6 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-white">{product.rating}</span>
                <span className="text-white/40">({product.reviewCount} verified reviews)</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h1>
              <p className="text-xs sm:text-sm text-white/50 mt-1">{product.subtitle}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-4 border-b border-white/10">
              <span className="text-3xl font-black text-[#FF202D]">
                {formatCurrency(product.configuredPrice)}
              </span>
              <span className="text-xs text-white/40">Includes precision tuning & factory seal</span>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              {product.description}
            </p>

            {/* Performance Ratings Bars */}
            <div className="space-y-3 py-2 border-y border-white/10">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/60">Speed Factor</span>
                  <span className="font-bold text-white">{product.speed} / 10</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#FF202D] rounded-full"
                    style={{ width: `${(product.speed / 10) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/60">Control Rating</span>
                  <span className="font-bold text-white">{product.control} / 10</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{ width: `${(product.control / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs text-white/60 font-semibold">Quantity:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-[#11141C] border border-white/10 flex items-center justify-center text-white hover:border-white/30"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold text-white w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-[#11141C] border border-white/10 flex items-center justify-center text-white hover:border-white/30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3.5 px-4 rounded-xl bg-[#FF202D] hover:bg-[#D71926] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FF202D]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleCustomize}
                  className="py-3.5 px-4 rounded-xl bg-transparent hover:bg-white/5 border border-white/20 hover:border-[#FF202D] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Sliders className="w-4 h-4 text-[#FF202D]" />
                  <span>Modify in 3D</span>
                </button>
              </div>
            </div>

            {/* Guarantee note */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-4 text-xs text-white/50">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ITTF Competition Ready
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-sky-400" />
                Dispatched in 48h
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

