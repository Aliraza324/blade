/**
 * Calculates deterministic, physically-grounded estimated weight for a blade
 * Based on ply specification, outer wood veneer density, and handle geometry.
 *
 * @param {Object} config - { material, handle, layers }
 * @returns {Object} weight in grams and breakdown
 */
export function calculateBladeWeight({ material, handle, layers } = {}) {
  // Base core & plies weight
  const baseWeight = layers?.baseWeight || 87; // default 5-ply

  // Wood veneer density factor: benchmark 0.50 g/cm3 standard
  // 2 outer veneers approx 20cm3 total volume => weight delta = (density - 0.50) * 16g
  const materialDensity = material?.density || 0.48;
  const materialDelta = Math.round((materialDensity - 0.50) * 16);

  // Handle geometry delta
  const handleDelta = handle?.weightDelta || 0;

  // Total estimated weight in grams
  const estimatedGrams = Math.round(baseWeight + materialDelta + handleDelta);

  return {
    estimatedGrams,
    toleranceGrams: '±3g', // standard industrial woodworking tolerance
    isEstimated: true,
    breakdown: {
      plyBase: baseWeight,
      outerVeneerDelta: materialDelta,
      handleDelta
    }
  };
}

