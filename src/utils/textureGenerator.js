import * as THREE from 'three';

const textureCache = new Map();

/**
 * Creates high-fidelity procedural canvas textures for wood surfaces
 */
export function generateBladeFaceTexture({
  material,
  design,
  colorTheme,
  showWoodGrain = true,
  customLogoUrl = null
}) {
  const cacheKey = `${material.id}-${design.id}-${colorTheme.id}-${showWoodGrain}-${customLogoUrl ? 'custom' : 'none'}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey);
  }

  const width = 1024;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Base wood background color - warm golden tone for Hinoki
  ctx.fillStyle = material.baseColor || '#E8C48E';
  ctx.fillRect(0, 0, width, height);

  // Draw procedural natural wood grain
  if (showWoodGrain) {
    drawWoodGrain(ctx, width, height, material);
  }

  // Apply color theme tint if selected
  if (colorTheme && colorTheme.id !== 'natural') {
    applyColorThemeTint(ctx, width, height, colorTheme);
  }

  // Draw design graphics (Classic, Carbon, Wave, Minimal, Custom Logo)
  drawBladeDesign(ctx, width, height, design, customLogoUrl, material);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Procedural longitudinal wood grain with realistic organic fibers matching Image 2
 */
function drawWoodGrain(ctx, width, height, material) {
  const isZebrano = material.id === 'zebrano';
  const isWalnut = material.id === 'walnut';
  const isHinoki = material.id === 'hinoki';

  ctx.save();

  if (isZebrano) {
    // Zebrano: striking alternating zebrawood stripes
    for (let x = 0; x < width; x += 14 + Math.sin(x * 0.04) * 8) {
      const stripeW = 5 + (Math.sin(x * 0.08) + 1) * 3;
      ctx.fillStyle = 'rgba(56, 32, 16, 0.65)';
      ctx.fillRect(x, 0, stripeW, height);
      ctx.fillStyle = 'rgba(30, 16, 8, 0.35)';
      ctx.fillRect(x + 1, 0, stripeW * 0.4, height);
    }
  } else {
    // Natural wood grain: fine vertical annual growth rings and pore lines
    const lineCount = isHinoki ? 460 : 340;

    for (let i = 0; i < lineCount; i++) {
      const x = Math.random() * width;
      const alpha = isHinoki
        ? 0.03 + Math.random() * 0.07 // very fine silky golden fibers for Hinoki
        : isWalnut
        ? 0.08 + Math.random() * 0.12
        : 0.04 + Math.random() * 0.08;

      ctx.strokeStyle = material.darkGrainColor || 'rgba(140, 95, 45, 0.2)';
      ctx.lineWidth = isHinoki ? 0.8 : 1.2;

      ctx.beginPath();
      ctx.moveTo(x, 0);

      // Subtle organic waving along the blade face
      const waveAmp = isWalnut ? 18 : 6;
      const cp1X = x + Math.sin(i * 0.5) * waveAmp;
      const cp2X = x + Math.cos(i * 0.5) * waveAmp;
      const endX = x + Math.sin(i) * (waveAmp * 0.5);

      ctx.bezierCurveTo(cp1X, height * 0.35, cp2X, height * 0.65, endX, height);
      ctx.stroke();
    }

    // Micro wood pores
    ctx.fillStyle = 'rgba(100, 70, 35, 0.05)';
    for (let p = 0; p < 900; p++) {
      const px = Math.random() * width;
      const py = Math.random() * height;
      ctx.fillRect(px, py, 1.2, 3 + Math.random() * 4);
    }
  }

  // Soft natural ambient illumination vignette
  const radial = ctx.createRadialGradient(
    width * 0.5, height * 0.45, width * 0.15,
    width * 0.5, height * 0.45, width * 0.65
  );
  radial.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
  radial.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
  radial.addColorStop(1, 'rgba(40, 20, 5, 0.12)');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, width, height);

  ctx.restore();
}

/**
 * Color theme tint blender
 */
function applyColorThemeTint(ctx, width, height, colorTheme) {
  ctx.save();
  ctx.fillStyle = colorTheme.hex;

  switch (colorTheme.id) {
    case 'black':
      ctx.globalCompositeOperation = 'multiply';
      ctx.globalAlpha = 0.82;
      break;
    case 'dark-walnut':
      ctx.globalCompositeOperation = 'multiply';
      ctx.globalAlpha = 0.65;
      break;
    case 'light-brown':
      ctx.globalCompositeOperation = 'multiply';
      ctx.globalAlpha = 0.35;
      break;
    case 'red':
      ctx.globalCompositeOperation = 'color-burn';
      ctx.globalAlpha = 0.55;
      break;
    case 'blue':
      ctx.globalCompositeOperation = 'color-burn';
      ctx.globalAlpha = 0.55;
      break;
    default:
      ctx.globalAlpha = 0.3;
      break;
  }

  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

/**
 * Blade design face artwork matching Image 2
 */
function drawBladeDesign(ctx, width, height, design, customLogoUrl, material) {
  const centerX = width * 0.5;
  const centerY = height * 0.48; // center of sweet spot

  ctx.save();

  if (design.id === 'classic') {
    // Exact laser branded artwork matching Image 2
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Stylized double "TT" monogram with forward italic slant
    ctx.font = '900 84px Impact, "Arial Black", sans-serif';
    ctx.fillStyle = '#1A1817';
    ctx.fillText('TT', centerX, centerY - 65);

    // Dynamic brand line under TT
    ctx.strokeStyle = '#FF202D';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX - 46, centerY - 20);
    ctx.lineTo(centerX + 46, centerY - 20);
    ctx.stroke();

    // Bold "TT Blade Pro" logotype
    ctx.font = '800 46px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#141312';
    ctx.fillText('TT Blade Pro', centerX, centerY + 16);

    // "Custom Made" subtext
    ctx.font = '600 24px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#38322E';
    ctx.fillText('Custom Made', centerX, centerY + 58);
  } else if (design.id === 'carbon') {
    // Carbon weave overlay
    ctx.fillStyle = 'rgba(20, 20, 24, 0.75)';
    ctx.fillRect(centerX - 95, height * 0.1, 190, height * 0.75);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    for (let y = height * 0.1; y < height * 0.85; y += 8) {
      ctx.beginPath();
      ctx.moveTo(centerX - 95, y);
      ctx.lineTo(centerX + 95, y + 12);
      ctx.stroke();
    }

    ctx.textAlign = 'center';
    ctx.font = '900 36px monospace';
    ctx.fillStyle = '#FF202D';
    ctx.fillText('CARBON FORCE', centerX, centerY);
    ctx.font = '600 18px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('INNER 2K WEAVE', centerX, centerY + 34);
  } else if (design.id === 'wave') {
    // Dynamic aerodynamic sweep wave
    ctx.beginPath();
    ctx.moveTo(centerX - 240, centerY + 120);
    ctx.bezierCurveTo(centerX - 80, centerY + 20, centerX + 120, centerY + 160, centerX + 240, centerY + 60);
    ctx.lineWidth = 18;
    ctx.strokeStyle = '#FF202D';
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.font = '800 38px system-ui, sans-serif';
    ctx.fillStyle = '#1A1817';
    ctx.fillText('TT AERO-WAVE', centerX, centerY - 40);
  } else if (design.id === 'minimal') {
    ctx.textAlign = 'center';
    ctx.font = '700 24px system-ui, sans-serif';
    ctx.fillStyle = '#1F1B18';
    ctx.fillText('TT PRO', centerX, centerY + 120);
  } else if (design.id === 'custom-logo' && customLogoUrl) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = customLogoUrl;
    img.onload = () => {
      ctx.drawImage(img, centerX - 120, centerY - 100, 240, 200);
      textureCache.delete(cacheKey);
    };
  }

  ctx.restore();
}

/**
 * Creates striped edge texture showing the multi-ply layers matching Image 2
 */
export function generateLayeredEdgeTexture(layers) {
  const cacheKey = `edge-${layers.id}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey);
  }

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const colors = layers.edgeColors || ['#E8C48E', '#B8864E', '#E8C48E', '#B8864E', '#E8C48E'];
  const plyH = canvas.height / colors.length;

  colors.forEach((col, idx) => {
    ctx.fillStyle = col;
    ctx.fillRect(0, idx * plyH, canvas.width, plyH);

    // Fine wood grain boundary line
    ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
    ctx.fillRect(0, idx * plyH + plyH - 1.5, canvas.width, 1.5);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(24, 1);
  texture.needsUpdate = true;

  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates realistic composite wood grip texture matching the handle in Image 1:
 * Deep rich dark walnut body with two crisp golden-amber pinstripes running along the beveled shoulder.
 */
export function generateHandleTexture() {
  const cacheKey = 'handle-composite-v4';
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey);
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Deep rich espresso walnut background
  ctx.fillStyle = '#2C1B12';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Vertical wood fibers with warm grain variations
  for (let i = 0; i < 700; i++) {
    const x = Math.random() * canvas.width;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(68, 44, 29, 0.45)' : 'rgba(18, 10, 6, 0.6)';
    ctx.fillRect(x, 0, 1.2 + Math.random() * 2.2, canvas.height);
  }

  // Left golden pinstripe inlay (along chamfer ridge, narrow and sharp matching Image 1)
  const leftX = canvas.width * 0.16;
  const pinstripeW = 14; // Crisp ~14px stripe (not a wide smear)

  // Dark framing border for left stripe
  ctx.fillStyle = '#140A05';
  ctx.fillRect(leftX - 2, 0, pinstripeW + 4, canvas.height);

  // Main bright golden maple inlay
  const leftGrad = ctx.createLinearGradient(leftX, 0, leftX + pinstripeW, 0);
  leftGrad.addColorStop(0, '#C8934E');
  leftGrad.addColorStop(0.5, '#F6D994'); // bright golden highlight
  leftGrad.addColorStop(1, '#C8934E');
  ctx.fillStyle = leftGrad;
  ctx.fillRect(leftX, 0, pinstripeW, canvas.height);

  // Right golden pinstripe inlay (along chamfer ridge)
  const rightX = canvas.width * 0.84 - pinstripeW;

  // Dark framing border for right stripe
  ctx.fillStyle = '#140A05';
  ctx.fillRect(rightX - 2, 0, pinstripeW + 4, canvas.height);

  // Main bright golden maple inlay
  const rightGrad = ctx.createLinearGradient(rightX, 0, rightX + pinstripeW, 0);
  rightGrad.addColorStop(0, '#C8934E');
  rightGrad.addColorStop(0.5, '#F6D994');
  rightGrad.addColorStop(1, '#C8934E');
  ctx.fillStyle = rightGrad;
  ctx.fillRect(rightX, 0, pinstripeW, canvas.height);

  // Subtle natural ambient shadow in central finger groove
  const centerGrad = ctx.createLinearGradient(canvas.width * 0.35, 0, canvas.width * 0.65, 0);
  centerGrad.addColorStop(0, 'rgba(0,0,0,0.22)');
  centerGrad.addColorStop(0.5, 'rgba(0,0,0,0)');
  centerGrad.addColorStop(1, 'rgba(0,0,0,0.22)');
  ctx.fillStyle = centerGrad;
  ctx.fillRect(canvas.width * 0.35, 0, canvas.width * 0.3, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;

  textureCache.set(cacheKey, texture);
  return texture;
}
