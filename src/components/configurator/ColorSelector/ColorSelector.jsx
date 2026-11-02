import React from 'react';
import { Check } from 'lucide-react';
import { COLOR_THEMES } from '../../../data/colors';
import { useConfiguratorStore } from '../../../store/configuratorStore';

export function ColorSelector() {
  const { color, setColor } = useConfiguratorStore();

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#FF202D] text-white text-xs font-bold flex items-center justify-center">
            4
          </span>
          <h3 className="text-sm font-semibold text-white tracking-wide">Color Theme</h3>
        </div>
        <span className="text-xs text-white/50">{color.name}</span>
      </div>

      {/* Circular Color Swatches matching reference */}
      <div className="flex items-center gap-3">
        {COLOR_THEMES.map((c) => {
          const isSelected = color.id === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setColor(c)}
              className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center hover:scale-110 active:scale-95 ${
                isSelected
                  ? 'border-[#FF202D] scale-110 shadow-lg shadow-[#FF202D]/30'
                  : 'border-white/20 hover:border-white/50'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            >
              {isSelected && (
                <Check
                  className={`w-4 h-4 stroke-[3] ${
                    c.id === 'black' || c.id === 'blue' || c.id === 'dark-walnut'
                      ? 'text-white'
                      : 'text-stone-900'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

