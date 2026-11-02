import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers,
  Star,
  Award,
  ChevronRight,
  Sliders,
  Feather,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { FEATURED_PRODUCTS } from '../../data/products';
import { WOOD_MATERIALS } from '../../data/materials';
import { useConfiguratorStore } from '../../store/configuratorStore';
import { useCartStore } from '../../store/cartStore';
import { formatCurrency } from '../../utils/pricing';
import toast from 'react-hot-toast';

export function HomePage() {
  const navigate = useNavigate();
  const { applyPresetProduct } = useConfiguratorStore();
  const { addItem, openCartDrawer } = useCartStore();

  const handleCustomizeProduct = (product) => {
    applyPresetProduct(product);
    navigate('/configurator');
  };

  const handleQuickAdd = (product) => {
    addItem({
      configurationId: `${product.id}-std`,
      name: product.name,
      subtitle: product.subtitle,
      quantity: 1,
      unitPrice: product.configuredPrice,
      customizationCost: product.configuredPrice - product.basePrice,
      estimatedWeight: product.weight,
      thumbnail: product.image
    });
    openCartDrawer();
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-white">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-white/10">
        {/* Cinematic ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF202D]/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#FF202D] animate-ping" />
                <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                  Next-Gen 3D Customization Platform
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08]">
                Engineer Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#FF202D]">
                  Perfect Blade.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Precision-crafted table tennis blades, customized to match your playing style. Calibrate rare tone-woods, inner-force carbon composites, ergonomic handles, and laser finishes in real-time 3D.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/configurator"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FF202D] hover:bg-[#D71926] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#FF202D]/30 transition-all hover:scale-105 active:scale-95"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Customize Your Blade</span>
                </Link>

                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#171B25] hover:bg-[#1E2330] border border-white/10 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:border-white/30"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 text-[#FF202D]" />
                </Link>
              </div>

              {/* Hero Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white">7+</span>
                  <p className="text-xs text-white/50 mt-0.5">Exotic Woods</p>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-[#FF202D]">±1g</span>
                  <p className="text-xs text-white/50 mt-0.5">Weight Precision</p>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white">100%</span>
                  <p className="text-xs text-white/50 mt-0.5">Custom Balanced</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl bg-gradient-to-b from-[#171B25] via-[#11141C] to-[#08090D] border border-white/15 p-6 shadow-2xl flex flex-col justify-between overflow-hidden group">
                {/* Glowing neon ring on stage */}
                <div className="absolute inset-0 bg-radial from-[#FF202D]/15 via-transparent to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FF202D]/20 text-[#FF202D] border border-[#FF202D]/40">
                    Live 3D Preview
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>4.9 / 5.0</span>
                  </div>
                </div>

                {/* Center Authentic Realistic Blade Visual */}
                <Link
                  to="/configurator"
                  className="relative flex-1 flex items-center justify-center my-4 group/blade cursor-pointer overflow-hidden rounded-2xl"
                >
                  {/* Subtle red under-glow aura */}
                  <div className="absolute bottom-2 w-56 h-12 bg-[#FF202D]/25 rounded-full blur-xl pointer-events-none" />

                  <img
                    src="/images/blade-hero.jpg"
                    alt="TT Blade Pro Tournament Custom Blade"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1784712130743-337f92c31b07?auto=format&fit=crop&w=1000&q=85';
                    }}
                    className="w-full h-full max-h-[340px] object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] group-hover/blade:scale-105 transition-transform duration-500"
                  />

                  {/* Floating quick 3D badge overlay on hover */}
                  <div className="absolute bottom-4 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-semibold text-white opacity-0 group-hover/blade:opacity-100 transition-opacity flex items-center gap-1.5 shadow-xl">
                    <Sliders className="w-3.5 h-3.5 text-[#FF202D]" />
                    <span>Customize in 3D</span>
                  </div>
                </Link>

                {/* Bottom interactive launch button */}
                <Link
                  to="/configurator"
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-[#FF202D] text-white text-xs font-bold text-center transition-all flex items-center justify-center gap-2 z-10"
                >
                  <Eye className="w-4 h-4" />
                  <span>Launch Interactive 3D Studio</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED BLADE COLLECTION */}
      <section className="py-20 border-b border-white/10 bg-[#0B0D14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#FF202D]">
                Tournament Series
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
                Featured Blade Collection
              </h2>
              <p className="text-xs sm:text-sm text-white/50 mt-1">
                Pre-calibrated tournament benchmarks ready for custom fine-tuning.
              </p>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>View All 6 Models</span>
              <ChevronRight className="w-4 h-4 text-[#FF202D]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PRODUCTS.slice(0, 3).map((blade) => (
              <div
                key={blade.id}
                className="rounded-2xl bg-[#171B25] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between overflow-hidden group shadow-xl"
              >
                {/* Blade Image & Badge */}
                <div className="relative h-60 bg-[#11141C] p-6 flex items-center justify-center overflow-hidden">
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#FF202D]/15 text-[#FF202D] border border-[#FF202D]/30 text-xs font-bold">
                    {blade.badge}
                  </span>

                  <img
                    src={blade.image}
                    alt={blade.name}
                    onError={(e) => {
                      e.currentTarget.src = '/images/products/tt-hinoki-pro.jpg';
                    }}
                    className="h-full w-full object-cover filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Blade Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white group-hover:text-[#FF202D] transition-colors">
                        {blade.name}
                      </h3>
                      <span className="text-base font-black text-[#FF202D]">
                        {formatCurrency(blade.configuredPrice)}
                      </span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">{blade.subtitle}</p>
                  </div>

                  {/* Specs Pill List */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-center text-xs">
                    <div>
                      <span className="text-white/40 block text-[10px]">Speed</span>
                      <strong className="text-white">{blade.speed}/10</strong>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px]">Control</span>
                      <strong className="text-white">{blade.control}/10</strong>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px]">Weight</span>
                      <strong className="text-emerald-400">{blade.weight}g</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => handleCustomizeProduct(blade)}
                      className="py-2.5 px-3 rounded-xl bg-[#FF202D] hover:bg-[#D71926] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#FF202D]/20"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Customize in 3D</span>
                    </button>

                    <button
                      onClick={() => handleQuickAdd(blade)}
                      className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EXOTIC TONE-WOOD SHOWCASE */}
      <section className="py-20 border-b border-white/10 bg-[#08090D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#FF202D]">
              Acoustic & Kinetic Mastery
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              7 Rare Tone-Wood Species
            </h2>
            <p className="text-xs sm:text-sm text-white/50">
              Each botanical species delivers distinct rebound velocity, contact vibration frequency, and ball dwell arc.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WOOD_MATERIALS.map((wood) => (
              <div
                key={wood.id}
                className="p-5 rounded-2xl bg-[#11141C] border border-white/10 hover:border-[#FF202D]/50 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg border border-white/20 shrink-0"
                      style={{ backgroundColor: wood.baseColor }}
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#FF202D] transition-colors">
                        {wood.name}
                      </h4>
                      <span className="text-[10px] text-white/40">{wood.origin}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400">
                    {wood.price === 0 ? 'Standard' : `+$${wood.price}`}
                  </span>
                </div>

                <p className="text-xs text-white/60 leading-relaxed line-clamp-3">
                  {wood.description}
                </p>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-white/50">
                  <span>Hardness: <strong className="text-white">{wood.hardness}</strong></span>
                  <span>Density: <strong className="text-emerald-400">{wood.density} g/cm³</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PERFORMANCE & CRAFTSMANSHIP */}
      <section className="py-20 border-b border-white/10 bg-[#0E1118]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase font-bold tracking-widest text-[#FF202D]">
                Engineering Philosophy
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                Crafted Without Compromise. <br />
                <span className="text-[#FF202D]">Balanced to Perfection.</span>
              </h2>
              <p className="text-sm text-white/60 leading-relaxed">
                Standard mass-market paddles suffer from ±8g weight variance and erratic sweet spots. At TT Blade Pro, every blade is digitally simulated in our 3D CAD engine, cross-laminated under 240 PSI pneumatic pressure, and verified with resonance acoustic testing.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FF202D] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-white">Aerospace Carbon Interleaving</h5>
                    <p className="text-xs text-white/50">Dual 2K carbon sheets expand the sweet spot to 92% of the total blade face.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FF202D] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-white">Nano-Shield Splinter Resistance</h5>
                    <p className="text-xs text-white/50">Micro-ceramic coating preserves outer wood grain fibers through hundreds of rubber changes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FF202D] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-white">Ergonomic Palm Fit Contours</h5>
                    <p className="text-xs text-white/50">Handle geometries hand-finished to eliminate pressure points on the index finger and thumb.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Table Card */}
            <div className="p-8 rounded-3xl bg-[#171B25] border border-white/10 space-y-6 shadow-2xl">
              <h4 className="text-lg font-bold text-white">Custom vs Conventional</h4>
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-3 gap-2 pb-2 border-b border-white/10 text-white/40 font-semibold uppercase">
                  <span>Metric</span>
                  <span>Generic Brand</span>
                  <span className="text-[#FF202D]">TT Blade Pro</span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5">
                  <span className="text-white/70">Weight Variance</span>
                  <span className="text-white/40">± 8-12 grams</span>
                  <span className="text-emerald-400 font-bold">± 1-3 grams</span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5">
                  <span className="text-white/70">Wood Selection</span>
                  <span className="text-white/40">Random batch</span>
                  <span className="text-emerald-400 font-bold">Acoustically matched</span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5">
                  <span className="text-white/70">Handle Shape</span>
                  <span className="text-white/40">Fixed standard</span>
                  <span className="text-emerald-400 font-bold">4 Ergonomic Choices</span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-2">
                  <span className="text-white/70">Custom Laser Badge</span>
                  <span className="text-white/40">None</span>
                  <span className="text-emerald-400 font-bold">Bespoke Engraving</span>
                </div>
              </div>

              <Link
                to="/configurator"
                className="w-full py-3.5 rounded-xl bg-[#FF202D] hover:bg-[#D71926] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#FF202D]/20"
              >
                <span>Design Yours Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-20 bg-[#08090D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#FF202D]">
              Player Endorsements
            </span>
            <h2 className="text-3xl font-black text-white">Trusted by Competitors</h2>
            <p className="text-xs text-white/50">Verified tournament players on the TT Blade Pro difference.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#11141C] border border-white/10 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-white/70 leading-relaxed italic">
                "The 3D preview was spot-on. When my Hinoki Master arrived, the balance was exactly 92 grams as predicted by the configurator. The catapult effect on third-ball attacks is unmatched."
              </p>
              <div>
                <strong className="text-sm font-bold text-white block">Marcus Lindqvist</strong>
                <span className="text-[11px] text-[#FF202D]">Division 1 League Competitor</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#11141C] border border-white/10 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-white/70 leading-relaxed italic">
                "Being able to specify an anatomic handle on a 5-ply carbon composite blade transformed my backhand block stability. No more wrist fatigue after 3-hour match days."
              </p>
              <div>
                <strong className="text-sm font-bold text-white block">Elena Chen</strong>
                <span className="text-[11px] text-[#FF202D]">National Junior Finalist</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#11141C] border border-white/10 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-white/70 leading-relaxed italic">
                "The Zebrano wood finish looks like a high-end luxury watch. Crisp acoustic feedback and razor-sharp directional control on over-the-table counterflicks."
              </p>
              <div>
                <strong className="text-sm font-bold text-white block">Julian Vane</strong>
                <span className="text-[11px] text-[#FF202D]">Club Champion & Coach</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

