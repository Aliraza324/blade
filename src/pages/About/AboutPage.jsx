import React from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Layers,
  TreePine,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#08090D] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#FF202D]">
            Heritage & Innovation
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            The Science Behind <br />
            <span className="text-[#FF202D]">The Ultimate Blade.</span>
          </h1>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed">
            Founded by materials engineers and tournament champions, TT Blade Pro unites centuries-old woodworking traditions with precision 3D CAD simulation.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#171B25] border border-white/10 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#FF202D]/15 text-[#FF202D] flex items-center justify-center">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Botanical Tone-Woods</h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              We harvest slow-grown Kiso Hinoki from Nagano, dense African Zebrano, and resonance Spruce. Every flitch of wood is air-seasoned for 24 months to normalize internal moisture content.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#171B25] border border-white/10 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#FF202D]/15 text-[#FF202D] flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Inner-Force Composite</h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              Aerospace carbon fleece sheets positioned right over the central core deliver immense explosive speed while preserving the organic ball touch of pure wood outer plies.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#171B25] border border-white/10 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#FF202D]/15 text-[#FF202D] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Micro-Gram Precision</h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              Standard brands accept broad 10-gram tolerances. We weigh every individual ply before bonding and calibrate your finished paddle to within ±1.5g of your configured weight target.
            </p>
          </div>
        </div>

        {/* Anatomy of a Blade Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#11141C] border border-white/10 space-y-8 shadow-2xl">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#FF202D]">
              Deconstructed Anatomy
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Multi-Ply Cross-Laminate Technology
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              How alternating grain orientations create directional rigidity and eliminate parasitic twisting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#171B25] border border-white/5 space-y-2">
              <span className="text-xs font-mono text-[#FF202D] font-bold">LAYER 01 & 05</span>
              <h4 className="text-sm font-bold text-white">Outer Veneer</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                0.55mm vertical grain. Determines initial ball contact touch, acoustic crack, and spin grip.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#171B25] border border-white/5 space-y-2">
              <span className="text-xs font-mono text-[#FF202D] font-bold">LAYER 02 & 04</span>
              <h4 className="text-sm font-bold text-white">Carbon Interleaving</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Bi-axial 2K woven carbon fibers. Enlarges the active sweet spot and eliminates rebound dead zones.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#171B25] border border-white/5 space-y-2">
              <span className="text-xs font-mono text-[#FF202D] font-bold">LAYER 03</span>
              <h4 className="text-sm font-bold text-white">Central Core</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                3.2mm thick lightweight Ayous or Kiri core. Acts as the kinetic spring engine delivering dwell and catapult.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#171B25] border border-white/5 space-y-2">
              <span className="text-xs font-mono text-[#FF202D] font-bold">STEM & SCALES</span>
              <h4 className="text-sm font-bold text-white">Ergonomic Handle</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Hollow-core vibration dampening composite grips hand-milled to four distinct competition shapes.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6 pt-6">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Ready to Build Your Champion Blade?
          </h2>
          <Link
            to="/configurator"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FF202D] hover:bg-[#D71926] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xl shadow-[#FF202D]/30 hover:scale-105"
          >
            <Sliders className="w-4 h-4" />
            <span>Launch 3D Configurator</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

