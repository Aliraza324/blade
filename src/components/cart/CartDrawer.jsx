import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Feather,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '../../store/cartStore';
import { formatCurrency } from '../../utils/pricing';

export function CartDrawer() {
  const navigate = useNavigate();
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeItem,
    promoCode,
    applyPromoCode,
    removePromoCode,
    promoError,
    getCartSummary
  } = useCartStore();

  const [inputCode, setInputCode] = useState('');
  const summary = getCartSummary();

  if (!isCartDrawerOpen) return null;

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

  const handleCheckoutClick = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closeCartDrawer}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-md bg-[#11141C] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl z-10 text-white animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#FF202D]/15 text-[#FF202D]">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Your Cart</h3>
              <p className="text-xs text-white/50">{summary.itemCount} item{summary.itemCount === 1 ? '' : 's'}</p>
            </div>
          </div>
          <button
            onClick={closeCartDrawer}
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-white/50 space-y-3">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-white/30" />
              </div>
              <p className="text-sm font-medium text-white">Your cart is currently empty</p>
              <p className="text-xs max-w-xs text-white/40">
                Craft a bespoke table tennis blade in our 3D configurator to get started.
              </p>
              <Link
                to="/configurator"
                onClick={closeCartDrawer}
                className="mt-3 px-5 py-2.5 rounded-xl bg-[#FF202D] text-white text-xs font-bold hover:bg-[#D71926] transition-all shadow-lg shadow-[#FF202D]/20"
              >
                Launch 3D Configurator
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartItemId}
                className="p-3.5 rounded-xl bg-[#171B25] border border-white/10 flex gap-3 relative group"
              >
                {/* Thumbnail */}
                <div
                  className="w-16 h-16 rounded-lg shrink-0 overflow-hidden border border-white/10 flex items-center justify-center"
                  style={{ backgroundColor: item.material?.baseColor || '#D7A15C' }}
                >
                  <div className="w-9 h-11 rounded-full border border-stone-800/40 bg-amber-200/40 flex flex-col items-center justify-center">
                    <span className="text-[7px] font-black text-stone-900">TT</span>
                    <div className="w-2 h-4 bg-stone-900 rounded-sm mt-0.5" />
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <p className="text-[11px] text-white/60 truncate">{item.subtitle}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.cartItemId)}
                      className="text-white/40 hover:text-[#FF202D] transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Config code & weight */}
                  <div className="flex items-center gap-2 mt-1.5 text-[10px]">
                    <span className="font-mono text-white/40 truncate max-w-[140px]">
                      {item.configurationId}
                    </span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Feather className="w-2.5 h-2.5" />
                      {item.estimatedWeight}g
                    </span>
                  </div>

                  {/* Price & Quantity Stepper */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-[#11141C] border border-white/10 flex items-center justify-center text-white/70 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-[#11141C] border border-white/10 flex items-center justify-center text-white/70 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[#FF202D]">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout button */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#0E1118] space-y-4">
            {/* Promo code input */}
            {promoCode ? (
              <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  Code {promoCode} (-{summary.discountPercent}%)
                </span>
                <button
                  onClick={removePromoCode}
                  className="text-emerald-300 hover:text-white underline text-[11px]"
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
                  className="flex-1 px-3 py-2 rounded-xl bg-[#171B25] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF202D]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-white/60">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">{formatCurrency(summary.subtotal)}</span>
              </div>
              {summary.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span>-{formatCurrency(summary.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="text-white font-medium">
                  {summary.shipping === 0 ? 'Free' : formatCurrency(summary.shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax (est.)</span>
                <span className="text-white font-medium">{formatCurrency(summary.estimatedTax)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white">
                <span>Total</span>
                <span className="text-lg font-black text-[#FF202D]">
                  {formatCurrency(summary.total)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 rounded-xl bg-[#FF202D] hover:bg-[#D71926] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FF202D]/20 transition-all hover:scale-[1.01]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/cart"
                onClick={closeCartDrawer}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-semibold text-xs flex items-center justify-center transition-colors"
              >
                View Full Cart Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

