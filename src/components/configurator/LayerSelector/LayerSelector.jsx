import React from 'react';
import { Layers, Check } from 'lucide-react';
import { BLADE_LAYERS } from '../../../data/layers';
import { useConfiguratorStore } from '../../../store/configuratorStore';

export function LayerSelector() {
  const { layers, setLayers } = useConfiguratorStore();

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#FF202D] text-white text-xs font-bold flex items-center justify-center">
            5
          </span>
          <h3 className="text-sm font-semibold text-white tracking-wide">Blade Layers</h3>
        </div>
        <span className="text-xs text-white/50">{layers.thicknessMm} mm</span>
      </div>

      {/* Layer Options Pills */}
      <div className="grid grid-cols-2 gap-2">
        {BLADE_LAYERS.map((l) => {
          const isSelected = layers.id === l.id;
          return (
            <button
              key={l.id}
              onClick={() => setLayers(l)}
              className={`p-2.5 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'border-[#FF202D] bg-[#1C202C] shadow-md shadow-[#FF202D]/10'
                  : 'border-white/10 bg-[#141822]/70 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">{l.name.split(' ')[0]}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#FF202D]" />}
              </div>
              <div className="flex items-center justify-between mt-1 text-[11px]">
                <span className="text-white/50">{l.feel.split('&')[0]}</span>
                <span className={`font-semibold ${isSelected ? 'text-[#FF202D]' : 'text-white/40'}`}>
                  {l.price === 0 ? '$0' : `+$${l.price}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

