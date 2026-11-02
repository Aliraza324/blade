import React, { useRef, useState } from 'react';
import { Check, Upload, Image as ImageIcon, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { DESIGN_STYLES } from '../../../data/designs';
import { useConfiguratorStore } from '../../../store/configuratorStore';

export function DesignSelector() {
  const { design, setDesign, customLogoUrl, setCustomLogoUrl } = useConfiguratorStore();
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle custom logo image upload
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, SVG)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setCustomLogoUrl(event.target?.result);
      const customOption = DESIGN_STYLES.find(d => d.id === 'custom-logo');
      if (customOption) setDesign(customOption);
      toast.success('Custom logo loaded onto 3D blade!');
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = (e) => {
    e.stopPropagation();
    setCustomLogoUrl(null);
    setDesign(DESIGN_STYLES[0]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#FF202D] text-white text-xs font-bold flex items-center justify-center">
            3
          </span>
          <h3 className="text-sm font-semibold text-white tracking-wide">Design Style</h3>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-xs text-white/50 hover:text-white flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <span className="text-[#FF202D]">→</span>
        </button>
      </div>

      {/* Grid of Designs (4 columns matching reference) */}
      <div className="grid grid-cols-4 gap-2">
        {DESIGN_STYLES.slice(0, 4).map((d) => {
          const isSelected = design.id === d.id;
          return (
            <button
              key={d.id}
              onClick={() => setDesign(d)}
              className={`group relative flex flex-col items-center p-2 rounded-xl border transition-all text-left ${
                isSelected
                  ? 'border-[#FF202D] bg-[#1C202C] shadow-lg shadow-[#FF202D]/10'
                  : 'border-white/10 bg-[#141822]/70 hover:border-white/20 hover:bg-[#171B25]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-1 right-1 z-10 w-4 h-4 rounded-full bg-[#FF202D] text-white flex items-center justify-center shadow-md">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}

              {/* Design preview graphic */}
              <div className="w-full h-12 rounded-lg mb-2 overflow-hidden border border-white/10 bg-[#0E1118] flex items-center justify-center relative">
                {d.id === 'classic' && (
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black tracking-widest text-amber-200/90">TT</span>
                    <span className="text-[7px] text-white/50">PRO</span>
                  </div>
                )}
                {d.id === 'carbon' && (
                  <div className="w-full h-full bg-stone-900 flex items-center justify-center relative">
                    <div className="w-3/4 h-full bg-gradient-to-r from-transparent via-[#FF202D]/30 to-transparent" />
                    <span className="absolute text-[8px] font-mono text-[#FF202D] font-bold">2K</span>
                  </div>
                )}
                {d.id === 'wave' && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-7 h-2 rounded-full border-t-2 border-[#FF202D] transform rotate-12" />
                  </div>
                )}
                {d.id === 'minimal' && (
                  <div className="w-2 h-2 rounded-full bg-white/40" />
                )}
              </div>

              {/* Title & Price */}
              <span className="text-xs font-medium text-white truncate w-full text-center">
                {d.name}
              </span>
              <span className={`text-[11px] font-semibold mt-0.5 ${isSelected ? 'text-[#FF202D]' : 'text-white/50'}`}>
                {d.price === 0 ? '$0' : `+$${d.price}`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom Logo Upload Trigger */}
      <div className="pt-1">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />

        {customLogoUrl ? (
          <div className="flex items-center justify-between p-2.5 rounded-xl border border-[#FF202D]/40 bg-[#FF202D]/10">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={customLogoUrl}
                alt="Uploaded Logo"
                className="w-8 h-8 rounded-lg object-contain bg-black/40 border border-white/10"
              />
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">Custom Logo Active</span>
                <span className="text-[10px] text-white/60">Rendered on 3D Blade face</span>
              </div>
            </div>
            <button
              onClick={removeLogo}
              className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
              title="Remove logo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2 px-3 rounded-xl border border-dashed border-white/20 hover:border-[#FF202D]/60 hover:bg-white/[0.02] text-xs font-medium text-white/70 hover:text-white flex items-center justify-center gap-2 transition-all"
          >
            <Upload className="w-3.5 h-3.5 text-[#FF202D]" />
            <span>Upload Custom Player Logo (+$20)</span>
          </button>
        )}
      </div>

      {/* Modal View All */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#171B25] border border-white/15 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FF202D] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  Blade Face Design Overlays
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Choose your surface graphics or upload bespoke artwork
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {DESIGN_STYLES.map((d) => {
                const isSelected = design.id === d.id;
                return (
                  <div
                    key={d.id}
                    onClick={() => {
                      setDesign(d);
                      if (d.id === 'custom-logo') {
                        fileInputRef.current?.click();
                      }
                      setIsModalOpen(false);
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#FF202D] bg-[#FF202D]/10'
                        : 'border-white/10 bg-[#11141C] hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{d.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#FF202D]" />}
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                          {d.badge}
                        </span>
                      </div>
                      <p className="text-xs text-white/60 mt-1">{d.description}</p>
                    </div>
                    <span className="text-sm font-bold text-white ml-4 shrink-0">
                      {d.price === 0 ? 'Included' : `+$${d.price}`}
                    </span>
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

