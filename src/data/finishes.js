export const FINISH_OPTIONS = [
  {
    id: 'natural',
    name: 'Natural Finish',
    price: 0,
    roughness: 0.65,
    metalness: 0.04,
    description: 'Raw, breathable organic feel. Leaves the tactile wood pores exposed for an authentic handcrafted sensation.',
    badge: 'Standard'
  },
  {
    id: 'matte',
    name: 'Matte Satin',
    price: 3,
    roughness: 0.50,
    metalness: 0.08,
    description: 'Micro-sanded low-glare satin seal. Enhances wood protection against sweat without altering rubber adhesion.',
    badge: 'Popular'
  },
  {
    id: 'glossy',
    name: 'High Gloss Lacquer',
    price: 5,
    roughness: 0.20,
    metalness: 0.20,
    description: 'Mirror-like ultraviolet gloss finish. Highlights the deep chatoyancy and shimmering figure of premium grains.',
    badge: 'Gloss'
  },
  {
    id: 'premium',
    name: 'Premium Nano-Shield',
    price: 10,
    roughness: 0.35,
    metalness: 0.14,
    description: 'Ultra-thin hydrophobic nano-ceramic sealant. Prevents wood surface splintering when changing rubbers while repelling moisture.',
    badge: 'Pro Recommended'
  }
];

export const DEFAULT_FINISH = FINISH_OPTIONS[0]; // Natural

