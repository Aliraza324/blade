import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Diamond,
  Truck,
  ShieldCheck,
  Headphones,
  ArrowRight,
  Mail,
  CheckCircle2,
  Globe,
  Share2,
  MessageSquare
} from 'lucide-react';
import toast from 'react-hot-toast';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    setIsSubscribed(true);
    toast.success('Subscribed to TT Blade Pro Engineering Digest!');
  };

  return (
    <footer className="w-full bg-[#08090D] border-t border-white/10 text-white">
      {/* 4 Feature Value Proposition Pillars matching reference image */}
      <div className="border-b border-white/10 bg-[#0E1118]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* 1. Premium Quality */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#FF202D] shrink-0">
                <Diamond className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Premium Quality</h4>
                <p className="text-xs text-white/50">Crafted for Champions</p>
              </div>
            </div>

            {/* 2. Fast Shipping */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#FF202D] shrink-0">
                <Truck className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Fast Shipping</h4>
                <p className="text-xs text-white/50">Worldwide Delivery</p>
              </div>
            </div>

            {/* 3. Secure Checkout */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#FF202D] shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Secure Checkout</h4>
                <p className="text-xs text-white/50">Your Data is Safe</p>
              </div>
            </div>

            {/* 4. 24/7 Support */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#FF202D] shrink-0">
                <Headphones className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">24/7 Support</h4>
                <p className="text-xs text-white/50">We're Here to Help</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#FF202D] rounded-lg transform -skew-x-12" />
                <span className="relative text-white font-black text-lg italic">TT</span>
              </div>
              <span className="text-xl font-black tracking-wider text-white">
                TT Blade <span className="text-[#FF202D]">Pro</span>
              </span>
            </Link>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              Custom-engineered competition table tennis blades. Handcrafted using aerospace-grade carbon fiber composites and sustainably harvested tone woods from Japan, Africa, and Europe.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-[#FF202D] transition-colors text-white/70 hover:text-white" title="Global Community">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-[#FF202D] transition-colors text-white/70 hover:text-white" title="Media & Highlights">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-[#FF202D] transition-colors text-white/70 hover:text-white" title="Live Discord">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Collections</h5>
            <ul className="space-y-2 text-xs text-white/60">
              <li><Link to="/configurator" className="hover:text-white transition-colors">3D Blade Configurator</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Pro Signature Series</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Pure Hinoki Dynasty</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Carbon Composite Blades</Link></li>
            </ul>
          </div>

          {/* Wood Technology */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Woodcraft</h5>
            <ul className="space-y-2 text-xs text-white/60">
              <li><Link to="/about" className="hover:text-white transition-colors">Kiso Hinoki Harvest</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">7-Ply Laminate Science</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Ergonomic Handle Profiles</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Custom Blade Workshop</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Stay Updated</h5>
            <p className="text-xs text-white/60">
              Receive notifications on rare wood harvests and pro player gear insights.
            </p>
            {isSubscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You're subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-white/40 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="Enter email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#141822] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF202D]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-[#FF202D] hover:bg-[#D71926] text-white text-xs font-bold transition-all shadow-md shadow-[#FF202D]/20"
                >
                  Join Engineering Club
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} TT Blade Pro. Built for competitive excellence. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Craftsmanship</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Support Desk</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
