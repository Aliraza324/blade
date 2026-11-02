import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  Bookmark,
  RotateCcw,
  Feather,
  Box,
  Crosshair,
  Palette,
  Disc
} from 'lucide-react';
import { useConfiguratorStore } from '../../../store/configuratorStore';
import { useCartStore } from '../../../store/cartStore';
import { calculateBladePricing } from '../../../utils/pricing';
import { calculateBladeWeight } from '../../../utils/weightCalculator';
import { generateConfigurationId } from '../../../utils/configuration';
import { BASE_BLADE_PRICE } from '../../../data/products';
import { DynamicBladeThumbnail } from './DynamicBladeThumbnail';

export function ProductSummary() {
  const navigate = useNavigate();
  const {
    material,
    handle,
    design,
    color,
    layers,
    finish,
    customLogoUrl,
    quantity,
    setQuantity,
    resetConfiguration,
    saveConfiguration
  } = useConfiguratorStore();

  const { addItem, openCartDrawer } = useCartStore();

  // Pricing & Weight calculations
  const pricing = calculateBladePricing({
    basePrice: BASE_BLADE_PRICE,
    material,
    handle,
    design,
    layers,
    finish,
    customLogoUrl
  });

  const weight = calculateBladeWeight({
    material,
    handle,
    layers
  });

  const configId = generateConfigurationId({ material, handle, layers });

  // Add to Cart handler
  const handleAddToCart = () => {
    const item = {
      configurationId: configId,
      name: 'TT Blade Pro',
      subtitle: 'Premium Custom Blade',
      material,
      handle,
      design,
      color,
      layers,
      finish,
      customLogoUrl,
      quantity,
      unitPrice: pricing.unitPrice,
      customizationCost: pricing.customizationCost,
      estimatedWeight: weight.estimatedGrams,
      thumbnail: material.thumbnail
    };

    addItem(item);
    openCartDrawer();
    toast.success(`Custom ${material.name} Blade added to cart!`, {
      icon: '🏓',
      style: { background: '#171B25', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
    });
  };

  // Buy Now handler
  const handleBuyNow = () => {
    const item = {
      configurationId: configId,
      name: 'TT Blade Pro',
      subtitle: 'Premium Custom Blade',
      material,
      handle,
      design,
      color,
      layers,
      finish,
      customLogoUrl,
      quantity,
      unitPrice: pricing.unitPrice,
      customizationCost: pricing.customizationCost,
      estimatedWeight: weight.estimatedGrams,
      thumbnail: material.thumbnail
    };

    addItem(item);
    navigate('/checkout');
  };

  // Save configuration
  const handleSave = () => {
    saveConfiguration();
    toast.success(`Configuration ${configId} saved!`, {
      icon: '💾',
      style: { background: '#171B25', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
    });
  };

  // Reset configuration
  const handleReset = () => {
    resetConfiguration();
    toast('Configuration reset to defaults', {
      icon: '🔄',
      style: { background: '#171B25', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#11141C]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 overflow-y-auto max-h-[850px] shadow-2xl space-y-4">
      {/* Panel Title matching uploaded screenshot */}
      <h2 className="text-base font-bold text-white tracking-wide">
        Your Custom Blade
      </h2>

      {/* Top Preview Card with LIVE DYNAMIC BLADE THUMBNAIL */}
      <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#171B25] border border-white/10 shadow-lg">
        {/* Dynamic Blade Thumbnail updating in real-time with user customizations */}
        <DynamicBladeThumbnail />

        {/* Product meta */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-black text-white truncate">TT Blade Pro</h3>
          <p className="text-xs text-white/50 truncate">Premium Custom Blade</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-white">4.8</span>
            <span className="text-[11px] text-white/40">(124 reviews)</span>
          </div>
        </div>
      </div>

      {/* Specifications Breakdown matching uploaded screenshot */}
      <div className="space-y-3 text-xs pt-1">
        {/* 1. Wood Material */}
        <div className="flex items-center justify-between py-1">
          <span className="text-white/60 flex items-center gap-2.5">
            <Box className="w-4 h-4 text-[#FF202D]" />
            Wood Material:
          </span>
          <span className="font-semibold text-white">{material.name}</span>
        </div>

        {/* 2. Handle Type */}
        <div className="flex items-center justify-between py-1">
          <span className="text-white/60 flex items-center gap-2.5">
            <Disc className="w-4 h-4 text-[#FF202D]" />
            Handle Type:
          </span>
          <span className="font-semibold text-white">{handle.name}</span>
        </div>

        {/* 3. Design Style */}
        <div className="flex items-center justify-between py-1">
          <span className="text-white/60 flex items-center gap-2.5">
            <Crosshair className="w-4 h-4 text-[#FF202D]" />
            Design Style:
          </span>
          <span className="font-semibold text-white">{design.name}</span>
        </div>

        {/* 4. Color Theme */}
        <div className="flex items-center justify-between py-1">
          <span className="text-white/60 flex items-center gap-2.5">
            <Palette className="w-4 h-4 text-[#FF202D]" />
            Color Theme:
          </span>
          <span className="font-semibold text-white">{color.name}</span>
        </div>
      </div>

      {/* Estimated Weight Badge matching uploaded screenshot */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#171B25] border border-white/10 mt-2">
        <div className="flex items-center gap-2.5">
          <Feather className="w-4 h-4 text-white/70" />
          <span className="text-xs font-medium text-white/70">Estimated Weight</span>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-white">{weight.estimatedGrams} g</span>
        </div>
      </div>

      {/* Pricing Breakdown matching uploaded screenshot */}
      <div className="space-y-1.5 pt-2 text-xs">
        <div className="flex items-center justify-between text-white/60">
          <span>Base Price</span>
          <span>{pricing.formatted.basePrice}</span>
        </div>
        <div className="flex items-center justify-between text-white/60">
          <span>Customization Cost</span>
          <span className="text-white/80 font-medium">{pricing.formatted.customizationCost}</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-bold text-white">Total Price</span>
          <span className="text-2xl font-black text-[#FF202D]">{pricing.formatted.unitPrice}</span>
        </div>
      </div>

      {/* Quantity Stepper matching uploaded screenshot */}
      <div className="flex items-center justify-center pt-1">
        <div className="flex items-center gap-6 bg-[#171B25] px-5 py-2 rounded-xl border border-white/10">
          <button
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity <= 1}
            className="text-white/60 hover:text-white disabled:opacity-30 transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-sm font-bold text-white w-4 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Primary Action Buttons matching uploaded screenshot */}
      <div className="space-y-2.5 pt-1">
        {/* Big Red Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full py-3.5 px-4 rounded-xl bg-[#FF202D] hover:bg-[#D71926] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF202D]/30 transition-all hover:scale-[1.01] active:scale-[0.98]"
        >
          <ShoppingCart className="w-4 h-4 fill-white" />
          <span>Add to Cart</span>
        </button>

        {/* Black Outlined Buy Now Button with lightning bolt */}
        <button
          onClick={handleBuyNow}
          className="w-full py-3 px-4 rounded-xl bg-transparent hover:bg-white/5 border border-[#FF202D]/60 hover:border-[#FF202D] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Zap className="w-4 h-4 text-white fill-white" />
          <span>Buy Now</span>
        </button>
      </div>

      {/* Secondary Actions (Save & Reset) */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
        <button
          onClick={handleSave}
          className="text-white/50 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <Bookmark className="w-3.5 h-3.5 text-[#FF202D]" />
          <span>Save Config</span>
        </button>

        <button
          onClick={handleReset}
          className="text-white/50 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>
    </div>
  );
}
