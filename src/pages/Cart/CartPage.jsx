import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sliders,
  Tag,
  Feather,
  Sparkles,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '../../store/cartStore';
import { formatCurrency } from '../../utils/pricing';

export function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    promoCode,
    applyPromoCode,
    removePromoCode,
    getCartSummary
  } = useCartStore();

  const [inputCode, setInputCode] = useState('');
  const summary = getCartSummary();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const res = applyPromoCode(inputCode);
    if (res.success) {
      toast.success(res.message);
      setInputCode('');
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl font-black text-white">Shopping Cart</h1>
            <p className="text-xs sm:text-sm text-white/50 mt-1">
              Review your customized table tennis blades and specifications.
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Clear all items from your cart?')) {
                  clearCart();
                  toast('Cart cleared', { icon: '🗑️' });
                }
              }}
              className="text-xs text-white/40 hover:text-[#FF202D] transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="p-16 rounded-3xl bg-[#11141C] border border-white/10 text-center space-y-4 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-white/40">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Your cart is empty</h3>
            <p className="text-xs text-white/50 max-w-sm mx-auto">
              You haven't configured any custom blades yet. Launch the 3D Studio to engineer your weapon.
            </p>
            <div className="pt-2">
              <Link
                to="/configurator"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF202D] hover:bg-[#D71926] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#FF202D]/20"
              >
                <Sliders className="w-4 h-4" />
                <span>Open 3D Configurator</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Items List (Cols 1-8) */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-5 rounded-2xl bg-[#171B25] border border-white/10 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between shadow-xl"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Thumbnail */}
                    <div
                      className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10 flex items-center justify-center"
                      style={{ backgroundColor: item.material?.baseColor || '#D7A15C' }}
                    >
                      <div className="w-10 h-12 rounded-full border border-stone-800/40 bg-amber-200/40 flex flex-col items-center justify-center">
                        <span className="text-[8px] font-black text-stone-900">TT</span>
                        <div className="w-2.5 h-4 bg-stone-900 rounded-sm mt-0.5" />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-base font-bold text-white truncate">{item.name}</h3>
                      <p className="text-xs text-white/60">{item.subtitle}</p>

                      {/* Specs tags */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70">
                          {item.material?.name || 'Wood'}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70">
                          {item.handle?.name || 'Flared'}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70">
                          {item.layers?.name?.split(' ')[0] || '5-Ply'}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold flex items-center gap-1">
                          <Feather className="w-2.5 h-2.5" />
                          {item.estimatedWeight}g est.
                        </span>
                      </div>

                      <div className="text-[10px] font-mono text-white/40 pt-0.5">
                        ID: {item.configurationId}
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    {/* Stepper */}
                    <div className="flex items-center gap-2 bg-[#11141C] p-1 rounded-xl border border-white/10">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-white w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-[#FF202D] block">
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </span>
                      <span className="text-[10px] text-white/40">
                        {formatCurrency(item.unitPrice)} each
                      </span>
                    </div>

                    <button
                      onClick={() => removeItem(item.cartItemId)}
                      className="text-white/40 hover:text-[#FF202D] transition-colors p-2"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <Link
                  to="/configurator"
                  className="text-xs font-semibold text-white/60 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#FF202D]" />
                  <span>Configure another blade</span>
                </Link>
              </div>
            </div>

            {/* Order Summary Box (Cols 9-12) */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#171B25] border border-white/10 space-y-6 shadow-2xl">
              <h2 className="text-lg font-bold text-white">Order Summary</h2>

              {/* Promo code */}
              {promoCode ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Tag className="w-4 h-4" />
                    Code {promoCode} (-{summary.discountPercent}%)
                  </span>
                  <button
                    onClick={removePromoCode}
                    className="text-emerald-300 hover:text-white underline text-xs"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. PRO10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-[#11141C] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF202D]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Itemized pricing */}
              <div className="space-y-2.5 text-xs text-white/60 pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Subtotal ({summary.itemCount} item{summary.itemCount === 1 ? '' : 's'})</span>
                  <span className="text-white font-medium">{formatCurrency(summary.subtotal)}</span>
                </div>
                {summary.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Pro Discount (-{summary.discountPercent}%)</span>
                    <span>-{formatCurrency(summary.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-white font-medium">
                    {summary.shipping === 0 ? 'Free (Orders > $100)' : formatCurrency(summary.shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="text-white font-medium">{formatCurrency(summary.estimatedTax)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/10 text-base font-bold text-white">
                  <span>Total Amount</span>
                  <span className="text-2xl font-black text-[#FF202D]">
                    {formatCurrency(summary.total)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 px-4 rounded-xl bg-[#FF202D] hover:bg-[#D71926] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#FF202D]/30 transition-all hover:scale-[1.01]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-white/40 text-center space-y-1">
                <p>Simulated secure demo payment</p>
                <p>30-Day Craftsman Performance Guarantee</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

