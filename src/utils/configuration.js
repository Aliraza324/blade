/**
 * Generates a human-readable unique configuration serial code
 * e.g., TTB-HIN-FLA-5P-9842
 */
export function generateConfigurationId(config) {
  const matCode = (config?.material?.name || 'HIN').substring(0, 3).toUpperCase();
  const handleCode = (config?.handle?.shortCode || 'FL').toUpperCase();
  const layerCode = (config?.layers?.id || '5p').replace('-ply', 'P').toUpperCase();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `TTB-${matCode}-${handleCode}-${layerCode}-${randomSuffix}`;
}

/**
 * Transforms configurator state into a WooCommerce integration-ready payload
 * Conforms to WooCommerce REST API Cart / Order line-item metadata structure.
 */
export function toWooCommercePayload(bladeConfig, pricing, weight) {
  return {
    product_id: bladeConfig.productId || 'ttb-custom-blade',
    name: 'TT Blade Pro - Custom Blade',
    quantity: bladeConfig.quantity || 1,
    subtotal: pricing.unitPrice.toString(),
    total: (pricing.unitPrice * (bladeConfig.quantity || 1)).toString(),
    meta_data: [
      { key: '_config_id', value: bladeConfig.id },
      { key: 'Wood Material', value: bladeConfig.material.name },
      { key: 'Handle Type', value: bladeConfig.handle.name },
      { key: 'Design Style', value: bladeConfig.design.name },
      { key: 'Color Theme', value: bladeConfig.color.name },
      { key: 'Blade Plies', value: bladeConfig.layers.name },
      { key: 'Finish', value: bladeConfig.finish.name },
      { key: 'Estimated Weight', value: `${weight.estimatedGrams}g` },
      { key: 'Customization Charge', value: `$${pricing.customizationCost.toFixed(2)}` },
      { key: 'Custom Logo Attached', value: Boolean(bladeConfig.customLogoUrl) }
    ],
    snapshot: {
      timestamp: new Date().toISOString(),
      pricing,
      weight,
      specs: {
        materialId: bladeConfig.material.id,
        handleId: bladeConfig.handle.id,
        designId: bladeConfig.design.id,
        colorId: bladeConfig.color.id,
        layerId: bladeConfig.layers.id,
        finishId: bladeConfig.finish.id
      }
    }
  };
}

