import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CustomizationPanel } from '../../components/configurator/CustomizationPanel/CustomizationPanel';
import { ProductViewer3D } from '../../components/configurator/ProductViewer3D/ProductViewer3D';
import { ProductSummary } from '../../components/configurator/ProductSummary/ProductSummary';

export function ConfiguratorPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#08090D] flex flex-col justify-between">
      {/* Main 3-Column Configurator Workspace matching reference image */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT PANEL: Customization Controls (Cols 1-3) */}
          <section className="lg:col-span-3 order-2 lg:order-1">
            <CustomizationPanel />
          </section>

          {/* CENTER PANEL: Interactive 3D Product Viewer (Cols 4-9) */}
          <section className="lg:col-span-6 order-1 lg:order-2 h-[520px] lg:h-[780px] w-full">
            <ProductViewer3D />
          </section>

          {/* RIGHT PANEL: Selected Configuration & Pricing Summary (Cols 10-12) */}
          <section className="lg:col-span-3 order-3">
            <ProductSummary />
          </section>
        </div>

        {/* Bottom Banner matching reference: Engineered for Performance */}
        <section className="mt-8 rounded-2xl overflow-hidden relative border border-white/10 bg-gradient-to-r from-[#0B0D14] via-[#141822] to-[#1C1F2B] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="relative z-10 max-w-xl space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#FF202D]">
              Tournament Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Engineered for <span className="text-[#FF202D]">Performance</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              Build your perfect blade with our advanced 3D configurator. Every veneer, handle shape, and composite layer is calibrated for unmatched speed, sweet-spot dwell, and vibration feedback.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              to="/shop"
              className="px-6 py-3 rounded-xl bg-transparent hover:bg-white/5 border border-[#FF202D] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#FF202D]/15"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 text-[#FF202D]" />
            </Link>
          </div>

          {/* Background subtle red glow */}
          <div className="absolute right-0 top-0 w-96 h-full bg-[#FF202D]/5 blur-3xl pointer-events-none" />
        </section>
      </main>
    </div>
  );
}

