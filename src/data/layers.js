export const BLADE_LAYERS = [
  {
    id: '3-ply',
    name: '3-Ply Pure Wood',
    price: 0,
    baseWeight: 82,
    plyCount: 3,
    hasCarbon: false,
    thicknessMm: 5.6,
    description: 'Ultra-flexible traditional Japanese 3-ply structure. Maximizes ball feeling, touch and immense topspin rotation.',
    edgeColors: ['#E6C280', '#D1A25B', '#E6C280'],
    feel: 'Flexible & High Dwell'
  },
  {
    id: '5-ply',
    name: '5-Ply Classic All-Wood',
    price: 10,
    baseWeight: 87,
    plyCount: 5,
    hasCarbon: false,
    thicknessMm: 5.9,
    description: 'The golden tournament standard: 1 thick core + 2 intermediate plies + 2 selected outer veneers. Superior balance.',
    edgeColors: ['#E6C280', '#BA894E', '#E6C280', '#BA894E', '#E6C280'],
    feel: 'Medium-Stiff & Linear'
  },
  {
    id: '7-ply',
    name: '7-Ply Power Offensive',
    price: 18,
    baseWeight: 93,
    plyCount: 7,
    hasCarbon: false,
    thicknessMm: 6.4,
    description: 'Dense 7-ply multi-laminate construction for relentless counter-smashing, flat hits, and rock-solid blocking against incoming spin.',
    edgeColors: ['#E6C280', '#A07038', '#E6C280', '#8D5E29', '#E6C280', '#A07038', '#E6C280'],
    feel: 'Stiff & Powerful'
  },
  {
    id: '5-ply-carbon',
    name: '5-Ply Carbon Composite',
    price: 28,
    baseWeight: 89,
    plyCount: 5,
    hasCarbon: true,
    thicknessMm: 5.8,
    description: '3 wood veneers reinforced with 2 high-grade woven carbon sheets positioned right beneath the outer wood. Enlarged sweet spot.',
    edgeColors: ['#E6C280', '#1A1A1A', '#E6C280', '#1A1A1A', '#E6C280'],
    feel: 'Direct, Crisp & Explosive'
  }
];

export const DEFAULT_LAYERS = BLADE_LAYERS[1]; // 5-Ply Classic

