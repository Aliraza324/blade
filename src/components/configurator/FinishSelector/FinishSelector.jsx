import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import { FINISH_OPTIONS } from '../../../data/finishes';
import { useConfiguratorStore } from '../../../store/configuratorStore';

export function FinishSelector() {
  const { finish, setFinish } = useConfiguratorStore();

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#FF202D] text-white text-xs font-bold flex items-center justify-center">
            6
          </span>
          <h3 className="text-sm font-semibold text-white tracking-wide">Surface Finish</h3>
        </div>
        <span className="text-xs text-white/50">{finish.badge}</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2">
        {FINISH_OPTIONS.map((f) => {
          const isSelected = finish.id === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFinish(f)}
              className={`p-2.5 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'border-[#FF202D] bg-[#1C202C] shadow-md shadow-[#FF202D]/10'
                  : 'border-white/10 bg-[#141822]/70 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">{f.name.split(' ')[0]}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#FF202D]" />}
              </div>
              <div className="flex items-center justify-between mt-1 text-[11px]">
                <span className="text-white/50">{f.badge}</span>
                <span className={`font-semibold ${isSelected ? 'text-[#FF202D]' : 'text-white/40'}`}>
                  {f.price === 0 ? '$0' : `+$${f.price}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

