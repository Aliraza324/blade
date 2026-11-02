import { create } from 'zustand';
import { WOOD_MATERIALS, DEFAULT_MATERIAL } from '../data/materials';
import { HANDLE_TYPES, DEFAULT_HANDLE } from '../data/handles';
import { DESIGN_STYLES, DEFAULT_DESIGN } from '../data/designs';
import { COLOR_THEMES, DEFAULT_COLOR } from '../data/colors';
import { BLADE_LAYERS, DEFAULT_LAYERS } from '../data/layers';
import { FINISH_OPTIONS, DEFAULT_FINISH } from '../data/finishes';
import { BASE_BLADE_PRICE } from '../data/products';
import { calculateBladePricing } from '../utils/pricing';
import { calculateBladeWeight } from '../utils/weightCalculator';
import { generateConfigurationId } from '../utils/configuration';

const LOCAL_STORAGE_SAVED_CONFIGS_KEY = 'ttblade_saved_configurations';
const LOCAL_STORAGE_CURRENT_CONFIG_KEY = 'ttblade_current_config';

function loadInitialState() {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_CURRENT_CONFIG_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      return {
        material: WOOD_MATERIALS.find(m => m.id === parsed.materialId) || DEFAULT_MATERIAL,
        handle: HANDLE_TYPES.find(h => h.id === parsed.handleId) || DEFAULT_HANDLE,
        design: DESIGN_STYLES.find(d => d.id === parsed.designId) || DEFAULT_DESIGN,
        color: COLOR_THEMES.find(c => c.id === parsed.colorId) || DEFAULT_COLOR,
        layers: BLADE_LAYERS.find(l => l.id === parsed.layerId) || DEFAULT_LAYERS,
        finish: FINISH_OPTIONS.find(f => f.id === parsed.finishId) || DEFAULT_FINISH,
        customLogoUrl: parsed.customLogoUrl || null,
        quantity: parsed.quantity || 1
      };
    }
  } catch {
    // fallback
  }

  return {
    material: DEFAULT_MATERIAL, // Hinoki as in reference
    handle: DEFAULT_HANDLE,     // Flared as in reference
    design: DEFAULT_DESIGN,     // Classic as in reference
    color: DEFAULT_COLOR,       // Natural Wood as in reference
    layers: DEFAULT_LAYERS,     // 5-Ply as in reference
    finish: DEFAULT_FINISH,     // Natural as in reference
    customLogoUrl: null,
    quantity: 1
  };
}

export const useConfiguratorStore = create((set, get) => {
  const initial = loadInitialState();

  const syncToLocalStorage = (state) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CURRENT_CONFIG_KEY, JSON.stringify({
        materialId: state.material.id,
        handleId: state.handle.id,
        designId: state.design.id,
        colorId: state.color.id,
        layerId: state.layers.id,
        finishId: state.finish.id,
        customLogoUrl: state.customLogoUrl,
        quantity: state.quantity
      }));
    } catch {
      // quota or private mode
    }
  };

  return {
    // Customization selections
    material: initial.material,
    handle: initial.handle,
    design: initial.design,
    color: initial.color,
    layers: initial.layers,
    finish: initial.finish,
    customLogoUrl: initial.customLogoUrl,
    quantity: initial.quantity,

    // 3D Viewport Controls & Toggles
    showWoodGrain: true,
    show3DLayers: true,
    enableRealisticLighting: true,
    activeAngleView: 'perspective', // 'perspective' (45°), 'front', 'back', 'side', 'handle'
    isAutoRotating: false,
    cameraResetTrigger: 0,
    isFullscreen: false,

    // Actions
    setMaterial: (material) => {
      set({ material });
      syncToLocalStorage({ ...get(), material });
    },
    setHandle: (handle) => {
      set({ handle });
      syncToLocalStorage({ ...get(), handle });
    },
    setDesign: (design) => {
      set({ design });
      syncToLocalStorage({ ...get(), design });
    },
    setColor: (color) => {
      set({ color });
      syncToLocalStorage({ ...get(), color });
    },
    setLayers: (layers) => {
      set({ layers });
      syncToLocalStorage({ ...get(), layers });
    },
    setFinish: (finish) => {
      set({ finish });
      syncToLocalStorage({ ...get(), finish });
    },
    setCustomLogoUrl: (customLogoUrl) => {
      set({ customLogoUrl });
      syncToLocalStorage({ ...get(), customLogoUrl });
    },
    setQuantity: (quantity) => {
      const q = Math.max(1, Math.min(99, quantity));
      set({ quantity: q });
      syncToLocalStorage({ ...get(), quantity: q });
    },

    // Viewer settings toggles
    toggleWoodGrain: () => set((state) => ({ showWoodGrain: !state.showWoodGrain })),
    toggle3DLayers: () => set((state) => ({ show3DLayers: !state.show3DLayers })),
    toggleRealisticLighting: () => set((state) => ({ enableRealisticLighting: !state.enableRealisticLighting })),
    setActiveAngleView: (angle) => set({ activeAngleView: angle }),
    toggleAutoRotate: () => set((state) => ({ isAutoRotating: !state.isAutoRotating })),
    resetCamera: () => set((state) => ({ cameraResetTrigger: state.cameraResetTrigger + 1, activeAngleView: 'perspective' })),
    setIsFullscreen: (isFullscreen) => set({ isFullscreen }),

    // Reset back to factory default reference configuration
    resetConfiguration: () => {
      const defaults = {
        material: DEFAULT_MATERIAL,
        handle: DEFAULT_HANDLE,
        design: DEFAULT_DESIGN,
        color: DEFAULT_COLOR,
        layers: DEFAULT_LAYERS,
        finish: DEFAULT_FINISH,
        customLogoUrl: null,
        quantity: 1,
        activeAngleView: 'perspective'
      };
      set(defaults);
      syncToLocalStorage(defaults);
    },

    // Apply pre-configured product preset (e.g. from shop or product detail)
    applyPresetProduct: (product) => {
      if (!product?.defaultConfig) return;
      const { materialId, handleId, designId, colorId, layerId, finishId } = product.defaultConfig;
      const updated = {
        material: WOOD_MATERIALS.find(m => m.id === materialId) || DEFAULT_MATERIAL,
        handle: HANDLE_TYPES.find(h => h.id === handleId) || DEFAULT_HANDLE,
        design: DESIGN_STYLES.find(d => d.id === designId) || DEFAULT_DESIGN,
        color: COLOR_THEMES.find(c => c.id === colorId) || DEFAULT_COLOR,
        layers: BLADE_LAYERS.find(l => l.id === layerId) || DEFAULT_LAYERS,
        finish: FINISH_OPTIONS.find(f => f.id === finishId) || DEFAULT_FINISH,
        quantity: 1
      };
      set(updated);
      syncToLocalStorage({ ...get(), ...updated });
    },

    // Save configuration snapshot to localStorage
    saveConfiguration: () => {
      const current = get();
      const pricing = calculateBladePricing({
        basePrice: BASE_BLADE_PRICE,
        material: current.material,
        handle: current.handle,
        design: current.design,
        layers: current.layers,
        finish: current.finish,
        customLogoUrl: current.customLogoUrl
      });
      const weight = calculateBladeWeight({
        material: current.material,
        handle: current.handle,
        layers: current.layers
      });
      const configId = generateConfigurationId(current);

      const snapshot = {
        id: configId,
        date: new Date().toISOString(),
        material: current.material,
        handle: current.handle,
        design: current.design,
        color: current.color,
        layers: current.layers,
        finish: current.finish,
        pricing,
        weight,
        quantity: current.quantity
      };

      try {
        const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SAVED_CONFIGS_KEY) || '[]');
        const updated = [snapshot, ...existing.filter(s => s.id !== configId)].slice(0, 15);
        localStorage.setItem(LOCAL_STORAGE_SAVED_CONFIGS_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }

      return snapshot;
    },

    getSavedConfigurations: () => {
      try {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_SAVED_CONFIGS_KEY) || '[]');
      } catch {
        return [];
      }
    }
  };
});

