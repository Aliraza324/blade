export const HANDLE_TYPES = [
  {
    id: 'flared',
    name: 'Flared',
    shortCode: 'FL',
    price: 0,
    weightDelta: 0, // standard benchmark
    description: 'Concave stem flaring wider toward the bottom. Anchors securely in the palm, preventing the blade from slipping during aggressive forehand swings.',
    bestFor: 'Forehand loopers, modern two-wing attackers',
    popularity: 'Most Popular (Used by 78% of pro players)'
  },
  {
    id: 'straight',
    name: 'Straight',
    shortCode: 'ST',
    price: 5,
    weightDelta: 1.5,
    description: 'Uniform width along the entire length. Enables effortless in-hand twiddling and grip rotation between forehand and backhand swings.',
    bestFor: 'Backhand-dominant players, chop defenders, twiddlers',
    popularity: 'Pro defensive & tactical favorite'
  },
  {
    id: 'anatomic',
    name: 'Anatomic',
    shortCode: 'AN',
    price: 8,
    weightDelta: 3.0,
    description: 'Features an ergonomic center bulge shaped to nestle naturally into the hollow of the palm. Minimizes grip fatigue over extended sessions.',
    bestFor: 'Players seeking maximum surface contact and stability',
    popularity: 'Ergonomic comfort choice'
  },
  {
    id: 'concave',
    name: 'Concave',
    shortCode: 'CO',
    price: 8,
    weightDelta: -1.0,
    description: 'Sleeker waist curvature with subtle bottom lip. Provides agile finger manipulation and lightning-quick wrist flicks over the table.',
    bestFor: 'Close-table speedsters and quick-reflex blockers',
    popularity: 'Precision touch favorite'
  }
];

export const DEFAULT_HANDLE = HANDLE_TYPES[0]; // Flared

