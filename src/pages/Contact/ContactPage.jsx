import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';

const FAQS = [
  {
    q: 'Are TT Blade Pro custom blades approved for official ITTF tournaments?',
    a: 'Yes, 100%. All TT Blade Pro blades comply strictly with ITTF Equipment Regulations Rule 2.4 (at least 85% natural wood by thickness, continuous ply layers, and permitted synthetic fiber boundaries).'
  },
  {
    q: 'How accurate is the 3D estimated weight calculator?',
    a: 'Our procedural density model calculates weight based on actual wood volumetric density and handle type. Our woodworking workshop guarantees final product weight to within ±2.5 grams of the configured estimate.'
  },
  {
    q: 'What is the production and dispatch timeframe for custom blades?',
    a: 'Standard custom blades are precision bonded, CNC contoured, nano-sealed, and dispatched within 48 to 72 hours. Bespoke laser logo engravings require 1 additional day of drying.'
  },
  {
    q: 'Do I need to apply varnish or blade sealer before mounting rubbers?',
    a: 'If you selected our "Premium Nano-Shield" or "Matte Satin" finish in the 3D configurator, your blade is already pre-sealed at our workshop. You can apply water-based table tennis glue directly without fear of splintering.'
  },
  {
    q: 'Can I request a custom handle thickness or weight balance target?',
    a: 'Yes! Simply mention your specific millimeter or weight preferences in the checkout notes or contact our engineering team directly.'
  }
];

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'custom-config',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please complete all required fields');
      return;
    }

    setIsSubmitted(true);
    toast.success('Your message has been sent to our master blade builders!');
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#FF202D]">
            Master Craftsmen Support
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">Get In Touch</h1>
          <p className="text-xs sm:text-sm text-white/50">
            Have questions about wood species, custom plies, or tournament specifications? Our engineers are here to advise you.
          </p>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form (Cols 1-7) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#171B25] border border-white/10 shadow-2xl">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Inquiry Received</h3>
                <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">
                  Thank you, <strong className="text-white">{formData.name}</strong>. A master blade consultant will reply to <strong className="text-white">{formData.email}</strong> within 1 business day.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', inquiryType: 'custom-config', subject: '', message: '' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">Send an Engineering Inquiry</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-white/60">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Timo Boll"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#11141C] border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FF202D]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-white/60">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="player@tabletennis.pro"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#11141C] border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FF202D]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white/60">Inquiry Topic</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#11141C] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF202D]"
                  >
                    <option value="custom-config">Custom 3D Configurator Consultation</option>
                    <option value="wood-advice">Wood Species & Rubber Matching Advice</option>
                    <option value="tournament-rules">ITTF Competition Rules Verification</option>
                    <option value="order-status">Custom Blade Production Status</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white/60">Message *</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your playing style, current rubbers, and what feedback you are looking for..."
                    className="w-full p-3.5 rounded-xl bg-[#11141C] border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FF202D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#FF202D] hover:bg-[#D71926] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FF202D]/20 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Info Details (Cols 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#171B25] border border-white/10 space-y-6 shadow-2xl">
              <h3 className="text-base font-bold text-white">Direct Workshop Contacts</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 text-[#FF202D] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white/40 block">Email Engineering Desk</span>
                    <strong className="text-white">craftsman@ttbladepro.com</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 text-[#FF202D] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white/40 block">Workshop Direct Line</span>
                    <strong className="text-white">+1 (800) 555-BLADE (2523)</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 text-[#FF202D] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white/40 block">Custom Laboratory & Atelier</span>
                    <strong className="text-white">742 High Spin Boulevard, Precision District, OR 97201</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 text-[#FF202D] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white/40 block">Luthier & Bench Hours</span>
                    <strong className="text-white">Mon – Fri: 08:00 – 18:00 PST</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-10 border-t border-white/10 max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#FF202D]">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Custom Blade Knowledge Base</h2>
          </div>

          <div className="space-y-3 pt-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#11141C] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-[#FF202D] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#FF202D]' : 'text-white/40'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-white/60 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

