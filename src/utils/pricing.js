import { BASE_BLADE_PRICE } from '../data/products';

/**
 * Calculates itemized and total price for a blade configuration
 * @param {Object} config - { material, handle, design, layers, finish, customLogoUrl }
 * @returns {Object} itemized breakdown and total
 */
export function calculateBladePricing({
  basePrice = BASE_BLADE_PRICE,
  material,
  handle,
  design,
  layers,
  finish,
  customLogoUrl
} = {}) {
  const safeBase = Number(basePrice) || BASE_BLADE_PRICE;
  const materialCost = material?.price || 0;
  const handleCost = handle?.price || 0;
  const designCost = (design?.id === 'custom-logo' && customLogoUrl ? 20 : design?.price) || 0;
  const layerCost = layers?.price || 0;
  const finishCost = finish?.price || 0;

  const customizationCost = materialCost + handleCost + designCost + layerCost + finishCost;
  const unitPrice = safeBase + customizationCost;

  return {
    basePrice: safeBase,
    materialCost,
    handleCost,
    designCost,
    layerCost,
    finishCost,
    customizationCost,
    unitPrice,
    formatted: {
      basePrice: `$${safeBase.toFixed(2)}`,
      customizationCost: `+$${customizationCost.toFixed(2)}`,
      unitPrice: `$${unitPrice.toFixed(2)}`
    }
  };
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount || 0);
}

