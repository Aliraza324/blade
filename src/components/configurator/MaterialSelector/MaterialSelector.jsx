import React, { useState } from 'react';
import { Check, Info, X } from 'lucide-react';
import { WOOD_MATERIALS } from '../../../data/materials';
import { useConfiguratorStore } from '../../../store/configuratorStore';

export function MaterialSelector() {
  const { material, setMaterial } = useConfiguratorStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // First 4 visible in primary grid matching reference screenshot
  const visibleMaterials = WOOD_MATERIALS.slice(0, 4);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#FF202D] text-white text-xs font-bold flex items-center justify-center">
            1
          </span>
          <h3 className="text-sm font-semibold text-white tracking-wide">Wood Material</h3>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-xs text-white/50 hover:text-white flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <span className="text-[#FF202D]">→</span>
        </button>
      </div>

      {/* Grid of Materials (4 columns matching reference) */}
      <div className="grid grid-cols-4 gap-2">
        {visibleMaterials.map((mat) => {
          const isSelected = material.id === mat.id;
          return (
            <button
              key={mat.id}
              onClick={() => setMaterial(mat)}
              className={`group relative flex flex-col items-center p-2 rounded-xl border transition-all text-left ${
                isSelected
                  ? 'border-[#FF202D] bg-[#1C202C] shadow-lg shadow-[#FF202D]/10'
                  : 'border-white/10 bg-[#141822]/70 hover:border-white/20 hover:bg-[#171B25]'
              }`}
            >
              {/* Checkmark badge when selected (top right of thumbnail) */}
              {isSelected && (
                <div className="absolute top-1 right-1 z-10 w-4 h-4 rounded-full bg-[#FF202D] text-white flex items-center justify-center shadow-md">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}

              {/* Wood texture thumbnail */}
              <div
                className="w-full h-12 rounded-lg mb-2 overflow-hidden border border-white/10 relative"
                style={{
                  backgroundColor: mat.baseColor,
                  backgroundImage: `radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.2) 100%)`
                }}
              >
                <div
                  className="w-full h-full opacity-70"
                  style={{
                    backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 5px)`
                  }}
                />
              </div>

              {/* Title & Price */}
              <span className="text-xs font-medium text-white truncate w-full text-center">
                {mat.name}
              </span>
              <span className={`text-[11px] font-semibold mt-0.5 ${isSelected ? 'text-[#FF202D]' : 'text-white/50'}`}>
                {mat.price === 0 ? '$0' : `+$${mat.price}`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Modal / Expanded View for all 7 Wood Materials with full engineering specs */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#171B25] border border-white/15 p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FF202D] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  Master Wood Selection
                </h3>
                <p className="text-xs text-white/50 mt-1">
                  Compare natural densities, rebound speeds, and acoustic profiles
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {WOOD_MATERIALS.map((mat) => {
                const isSelected = material.id === mat.id;
                return (
                  <div
                    key={mat.id}
                    onClick={() => {
                      setMaterial(mat);
                      setIsModalOpen(false);
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#FF202D] bg-[#FF202D]/10 shadow-lg shadow-[#FF202D]/10'
                        : 'border-white/10 bg-[#11141C] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-white/10"
                        style={{ backgroundColor: mat.baseColor }}
                      >
                        <div
                          className="w-full h-full opacity-60"
                          style={{
                            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 5px)`
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                            {mat.name}
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#FF202D]" />}
                          </h4>
                          <span className="text-xs font-bold text-[#FF202D]">
                            {mat.price === 0 ? 'Included' : `+$${mat.price}`}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/60 mt-1 line-clamp-2">
                          {mat.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-white/50">
                          <span>Speed: <strong className="text-white">{mat.speedRating}/10</strong></span>
                          <span>Control: <strong className="text-white">{mat.controlRating}/10</strong></span>
                          <span>Origin: <strong className="text-white">{mat.origin}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

