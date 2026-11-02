import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ShieldAlert,
  CheckCircle2,
  Lock,
  CreditCard,
  Truck,
  ArrowRight,
  ArrowLeft,
  Download,
  Printer,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '../../store/cartStore';
import { formatCurrency } from '../../utils/pricing';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart, getCartSummary } = useCartStore();
  const summary = getCartSummary();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'United States',
    postalCode: '',
    paymentMethod: 'card',
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal / ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/configurator');
      return;
    }

    if (!validateForm()) {
      toast.error('Please complete all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const orderNumber = `TTB-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const confirmation = {
        orderNumber,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        customer: { ...formData },
        items: [...items],
        summary: { ...summary },
        estimatedDelivery: '3 - 5 business days'
      };

      setOrderConfirmation(confirmation);
      setIsSubmitting(false);
      clearCart();

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      toast.success('Demonstration Order Placed Successfully!');
    }, 1200);
  };

  // Order Confirmation View
  if (orderConfirmation) {
    return (
      <div className="min-h-screen bg-[#08090D] text-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#171B25] border border-white/15 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Demonstration Order Confirmed
              </span>
              <h1 className="text-3xl font-black text-white mt-1">Thank You For Your Order!</h1>
              <p className="text-xs sm:text-sm text-white/60 mt-2">
                Order confirmation and production telemetry dispatched to{' '}
                <strong className="text-white">{orderConfirmation.customer.email}</strong>
              </p>
            </div>

            {/* Order Details snapshot */}
            <div className="p-5 rounded-2xl bg-[#11141C] border border-white/10 text-left space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">Order Number</span>
                <span className="font-mono font-bold text-[#FF202D]">{orderConfirmation.orderNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">Recipient</span>
                <span className="font-semibold text-white">{orderConfirmation.customer.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">Shipping Destination</span>
                <span className="font-semibold text-white text-right">
                  {orderConfirmation.customer.address}, {orderConfirmation.customer.city}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">Estimated Dispatch</span>
                <span className="font-semibold text-emerald-400">{orderConfirmation.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-bold text-white">
                <span>Total Amount (Demo)</span>
                <span className="text-lg font-black text-[#FF202D]">
                  {formatCurrency(orderConfirmation.summary.total)}
                </span>
              </div>
            </div>

            {/* Customized Blades configured in this order */}
            <div className="text-left space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/50">
                Custom Blades In Production
              </h4>
              <div className="space-y-2">
                {orderConfirmation.items.map((it, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#141822] border border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-white block">{it.name}</strong>
                      <span className="text-white/50 text-[11px]">{it.subtitle} • {it.estimatedWeight}g</span>
                    </div>
                    <span className="font-mono text-white/60 text-[10px]">Qty: {it.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => window.print()}
                className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={() => navigate('/configurator')}
                className="py-3 px-4 rounded-xl bg-[#FF202D] hover:bg-[#D71926] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-[#FF202D]/20"
              >
                <span>New 3D Blade</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090D] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Demonstration Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-3 text-xs sm:text-sm">
          <ShieldAlert className="w-5 h-5 shrink-0 text-amber-400" />
          <div>
            <strong className="block text-amber-200">Demonstration Checkout Environment</strong>
            <span>This is a simulated demo checkout. No actual credit card or payment will be processed.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Checkout Form (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Step 1: Customer Info */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#171B25] border border-white/10 space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FF202D] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  Customer Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-white/60">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Jan-Ove Waldner"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#11141C] border text-xs text-white placeholder-white/30 focus:outline-none ${
                        errors.fullName ? 'border-[#FF202D]' : 'border-white/10 focus:border-[#FF202D]'
                      }`}
                    />
                    {errors.fullName && <p className="text-[10px] text-[#FF202D]">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-white/60">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. player@champion.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#11141C] border text-xs text-white placeholder-white/30 focus:outline-none ${
                        errors.email ? 'border-[#FF202D]' : 'border-white/10 focus:border-[#FF202D]'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-[#FF202D]">{errors.email}</p>}
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs text-white/60">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#11141C] border text-xs text-white placeholder-white/30 focus:outline-none ${
                        errors.phone ? 'border-[#FF202D]' : 'border-white/10 focus:border-[#FF202D]'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-[#FF202D]">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#171B25] border border-white/10 space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FF202D] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  Shipping Address
                </h2>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs text-white/60">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Table Tennis Way, Suite 400"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#11141C] border text-xs text-white placeholder-white/30 focus:outline-none ${
                        errors.address ? 'border-[#FF202D]' : 'border-white/10 focus:border-[#FF202D]'
                      }`}
                    />
                    {errors.address && <p className="text-[10px] text-[#FF202D]">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-white/60">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Stockholm"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#11141C] border text-xs text-white placeholder-white/30 focus:outline-none ${
                          errors.city ? 'border-[#FF202D]' : 'border-white/10 focus:border-[#FF202D]'
                        }`}
                      />
                      {errors.city && <p className="text-[10px] text-[#FF202D]">{errors.city}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-white/60">Country *</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#11141C] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF202D]"
                      >
                        <option value="United States">United States</option>
                        <option value="Germany">Germany</option>
                        <option value="Japan">Japan</option>
                        <option value="Sweden">Sweden</option>
                        <option value="France">France</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-white/60">Postal / ZIP Code *</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="10001"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#11141C] border text-xs text-white placeholder-white/30 focus:outline-none ${
                          errors.postalCode ? 'border-[#FF202D]' : 'border-white/10 focus:border-[#FF202D]'
                        }`}
                      />
                      {errors.postalCode && <p className="text-[10px] text-[#FF202D]">{errors.postalCode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Simulated Payment Method */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#171B25] border border-white/10 space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FF202D] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  Payment Method (Demonstration)
                </h2>

                <div className="p-4 rounded-2xl bg-[#11141C] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#FF202D]" />
                      Simulated Test Card
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                      Sandbox Safe
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-white/40 block">Card Number</span>
                      <span className="font-mono text-white/80">{formData.cardNumber}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/40 block">Expires / CVC</span>
                      <span className="font-mono text-white/80">{formData.cardExp} • {formData.cardCvc}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full py-4 px-6 rounded-xl bg-[#FF202D] hover:bg-[#D71926] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#FF202D]/30 transition-all hover:scale-[1.01] active:scale-[0.98]"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isSubmitting ? 'Simulating Order...' : 'Place Demo Order'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar Summary (Cols 8-12) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#171B25] border border-white/10 space-y-6 shadow-2xl">
            <h3 className="text-base font-bold text-white">Order Review</h3>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {items.map((it) => (
                <div key={it.cartItemId} className="p-3 rounded-xl bg-[#11141C] border border-white/5 flex gap-3">
                  <div
                    className="w-12 h-12 rounded-lg shrink-0 overflow-hidden border border-white/10 flex items-center justify-center"
                    style={{ backgroundColor: it.material?.baseColor || '#D7A15C' }}
                  >
                    <span className="text-[8px] font-bold text-stone-900">TT</span>
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <h4 className="font-bold text-white truncate">{it.name}</h4>
                    <p className="text-[11px] text-white/50">{it.subtitle}</p>
                    <div className="flex items-center justify-between mt-1 text-[11px]">
                      <span className="text-white/40">Qty: {it.quantity}</span>
                      <span className="font-bold text-[#FF202D]">{formatCurrency(it.unitPrice * it.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-white/60 pt-4 border-t border-white/10">
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
                <span>Shipping</span>
                <span className="text-white font-medium">
                  {summary.shipping === 0 ? 'Free' : formatCurrency(summary.shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="text-white font-medium">{formatCurrency(summary.estimatedTax)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-white/10 text-base font-bold text-white">
                <span>Total</span>
                <span className="text-2xl font-black text-[#FF202D]">
                  {formatCurrency(summary.total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

