import React from 'react';
import { Box, Eye, Layers, Sun } from 'lucide-react';
import { MaterialSelector } from '../MaterialSelector/MaterialSelector';
import { HandleSelector } from '../HandleSelector/HandleSelector';
import { DesignSelector } from '../DesignSelector/DesignSelector';
import { ColorSelector } from '../ColorSelector/ColorSelector';
import { LayerSelector } from '../LayerSelector/LayerSelector';
import { FinishSelector } from '../FinishSelector/FinishSelector';
import { useConfiguratorStore } from '../../../store/configuratorStore';

export function CustomizationPanel() {
  const {
    showWoodGrain,
    toggleWoodGrain,
    show3DLayers,
    toggle3DLayers,
    enableRealisticLighting,
    toggleRealisticLighting
  } = useConfiguratorStore();

  return (
    <div className="flex flex-col h-full bg-[#171B25]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 overflow-y-auto max-h-[850px] shadow-2xl space-y-6">
      {/* Panel Header matching reference screenshot */}
      <div className="flex items-start gap-3 pb-3 border-b border-white/10">
        <div className="p-2.5 rounded-xl bg-[#FF202D]/15 border border-[#FF202D]/30 text-[#FF202D]">
          <Box className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white tracking-wide">
            Customize Your Blade
          </h2>
          <p className="text-xs text-white/50 mt-0.5">
            Choose options to design your perfect blade
          </p>
        </div>
      </div>

      {/* 1. Wood Material */}
      <MaterialSelector />

      {/* 2. Handle Type */}
      <HandleSelector />

      {/* 3. Design Style */}
      <DesignSelector />

      {/* 4. Color Theme */}
      <ColorSelector />

      {/* 5. Blade Layers */}
      <LayerSelector />

      {/* 6. Surface Finish */}
      <FinishSelector />

      {/* Feature Toggles (matching reference screenshot switches) */}
      <div className="pt-4 border-t border-white/10 space-y-3">
        {/* Toggle 1: Show Wood Grain */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-xs text-white/80">
            <Eye className="w-4 h-4 text-white/50" />
            <span>Show Wood Grain</span>
          </div>
          <button
            onClick={toggleWoodGrain}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              showWoodGrain ? 'bg-[#FF202D]' : 'bg-white/20'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                showWoodGrain ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle 2: Show 3D Layers */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-xs text-white/80">
            <Layers className="w-4 h-4 text-white/50" />
            <span>Show 3D Layers</span>
          </div>
          <button
            onClick={toggle3DLayers}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              show3DLayers ? 'bg-[#FF202D]' : 'bg-white/20'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                show3DLayers ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle 3: Enable Realistic Lighting */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-xs text-white/80">
            <Sun className="w-4 h-4 text-white/50" />
            <span>Enable Realistic Lighting</span>
          </div>
          <button
            onClick={toggleRealisticLighting}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              enableRealisticLighting ? 'bg-[#FF202D]' : 'bg-white/20'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                enableRealisticLighting ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

