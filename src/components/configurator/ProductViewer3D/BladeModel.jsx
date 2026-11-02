import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useConfiguratorStore } from '../../../store/configuratorStore';
import {
  generateBladeFaceTexture,
  generateLayeredEdgeTexture,
  generateHandleTexture
} from '../../../utils/textureGenerator';

/**
 * Authentic, tournament-grade table tennis blade silhouette matching Image 1 & Image 2
 * Dimensions reflect competition standard: ~153mm head length, ~150mm head width,
 * perfectly symmetrical curved upper dome, smooth cheeks, and ergonomic finger wings.
 * Tang accurately matches the selected handle geometry for a flush sandwich.
 */
function createSymmetricPaddleShape(handleType) {
  const shape = new THREE.Shape();

  const handleId = handleType?.id || 'flared';
  const topY = 0.78;       // Apex of paddle head
  const shoulderY = 0.05;  // Widest point (width 1.50)
  const maxHalfW = 0.75;   // Half width 75mm (full width 150mm)
  const neckY = -0.75;     // Neck / throat where handle begins
  const neckHalfW = getHandleHalfWidth(handleId, 0); // Flush entry into handle
  const buttY = -1.77;     // Base of handle tang
  const buttHalfW = getHandleHalfWidth(handleId, 1); // Flush butt width

  // 1. Start at top apex (0, 0.78)
  shape.moveTo(0, topY);

  // 2. Right upper dome: smooth, round, harmonic circular oval
  shape.bezierCurveTo(
    0.41, topY,           // Horizontal tangent at apex
    maxHalfW, 0.42,       // Flowing into vertical tangent
    maxHalfW, shoulderY   // Widest point (0.75, 0.05)
  );

  // 3. Right lower body: smooth tapering curve down towards wing
  shape.bezierCurveTo(
    maxHalfW, -0.28,
    0.58, -0.52,
    0.42, -0.62
  );

  // 4. Right ergonomic wing cutout: curves gently inward into the neck
  shape.bezierCurveTo(
    0.28, -0.70,
    0.18, -0.74,
    neckHalfW, neckY      // Neck entry
  );

  // 5. Down into the handle tang, matching handle scale taper
  const tangSteps = 16;
  for (let i = 0; i <= tangSteps; i++) {
    const t = i / tangSteps;
    const y = neckY + t * (buttY - neckY);
    const hw = getHandleHalfWidth(handleId, t);
    shape.lineTo(hw, y);
  }

  // Bottom edge of core ply tang (perfectly flush with handle scales)
  shape.lineTo(-buttHalfW, buttY);

  // Up the left side of the tang
  for (let i = tangSteps; i >= 0; i--) {
    const t = i / tangSteps;
    const y = neckY + t * (buttY - neckY);
    const hw = getHandleHalfWidth(handleId, t);
    shape.lineTo(-hw, y);
  }

  // 6. Left ergonomic wing cutout (mirrored)
  shape.bezierCurveTo(
    -0.18, -0.74,
    -0.28, -0.70,
    -0.42, -0.62
  );

  // 7. Left lower body (mirrored)
  shape.bezierCurveTo(
    -0.58, -0.52,
    -maxHalfW, -0.28,
    -maxHalfW, shoulderY  // Left widest point (-0.75, 0.05)
  );

  // 8. Left upper dome (mirrored back to apex)
  shape.bezierCurveTo(
    -maxHalfW, 0.42,
    -0.41, topY,
    0, topY
  );

  shape.closePath();
  return shape;
}

/**
 * Returns half-width at position Y along handle for the 4 handle types
 * matching Image 1 & Image 2
 */
function getHandleHalfWidth(handleTypeId, tNorm) {
  // tNorm goes from 0 (neck at y=-0.75) to 1 (butt at y=-1.77)
  switch (handleTypeId) {
    case 'flared':
      // Flared (FL): starts 0.136, narrows slightly at upper grip to 0.126, flares to 0.176 at butt
      if (tNorm < 0.35) {
        return 0.136 - (tNorm / 0.35) * 0.010;
      } else {
        const f = (tNorm - 0.35) / 0.65;
        return 0.126 + f * f * 0.050;
      }

    case 'straight':
      // Straight (ST): uniform competition cylinder along entire length
      return 0.140;

    case 'anatomic':
      // Anatomic (AN): palm bulge in the middle ~0.165, tapering before butt
      if (tNorm < 0.5) {
        const f = tNorm / 0.5;
        return 0.135 + Math.sin(f * Math.PI * 0.5) * 0.030;
      } else {
        const f = (tNorm - 0.5) / 0.5;
        return 0.165 - Math.sin(f * Math.PI) * 0.020 + f * 0.010;
      }

    case 'concave':
      // Concave: narrow waist in the middle, flared bottom
      if (tNorm < 0.45) {
        const f = tNorm / 0.45;
        return 0.138 - Math.sin(f * Math.PI * 0.5) * 0.020;
      } else {
        const f = (tNorm - 0.45) / 0.55;
        return 0.118 + Math.pow(f, 1.8) * 0.056;
      }

    default:
      return 0.136 + tNorm * 0.04;
  }
}

/**
 * Creates ergonomic handle scale matching Image 1:
 * - 35° thumb ramp at throat
 * - Octagonal cross-section with beveled side shoulders
 * - Solid, fully enclosed butt end with rounded corners and no protruding flaps
 * - Outward facing normals (Z > 0), perfectly reusable for both Front and Back via 180° rotation!
 */
function createErgonomicHandleScale(handleType) {
  const geom = new THREE.BufferGeometry();

  const topY = -0.74;       // Throat where handle meets blade head
  const rampEndY = -0.92;   // Base of 35° slanted thumb ramp
  const buttY = -1.77;      // Bottom butt of handle
  const maxScaleThickness = 0.076; // ~7.6mm scale thickness
  const minRampThickness = 0.012;  // Tip meeting blade face

  const numSlices = 24;
  const vertices = [];
  const uvs = [];
  const indices = [];

  for (let s = 0; s <= numSlices; s++) {
    const tNorm = s / numSlices;
    const y = topY + tNorm * (buttY - topY);

    // Thickness profile: slanted thumb ramp from topY to rampEndY, then full thickness to butt
    let thickness = maxScaleThickness;
    if (y > rampEndY) {
      const rampProgress = (y - rampEndY) / (topY - rampEndY);
      thickness = maxScaleThickness - Math.pow(rampProgress, 1.1) * (maxScaleThickness - minRampThickness);
    }

    // Soft rounded fillet at the very butt rim (luxurious handcrafted finish)
    if (tNorm > 0.95) {
      const filletProgress = (tNorm - 0.95) / 0.05;
      thickness -= Math.pow(filletProgress, 2) * 0.007;
    }

    let halfW = getHandleHalfWidth(handleType?.id || 'flared', tNorm);
    if (tNorm > 0.95) {
      const filletProgress = (tNorm - 0.95) / 0.05;
      halfW -= Math.pow(filletProgress, 2) * 0.003;
    }

    const chamferW = halfW * 0.28;
    const chamferT = thickness * 0.32;

    const vZ = thickness;
    const vZChamfer = thickness - chamferT;
    const baseZ = 0; // Flat bottom touching the core tang

    // 6 profile points per slice (octagonal beveled grip):
    // 0: Left base
    // 1: Left lower wall
    // 2: Left top chamfer
    // 3: Right top chamfer
    // 4: Right lower wall
    // 5: Right base
    const slicePoints = [
      [-halfW, y, baseZ],
      [-halfW, y, vZChamfer * 0.65],
      [-halfW + chamferW, y, vZ],
      [halfW - chamferW, y, vZ],
      [halfW, y, vZChamfer * 0.65],
      [halfW, y, baseZ]
    ];

    slicePoints.forEach(([px, py, pz]) => {
      vertices.push(px, py, pz);
      // Normalized UV coordinates:
      // u: 0 at left edge, 0.14 at left chamfer, 0.86 at right chamfer, 1 at right edge
      const u = (px / (halfW * 2)) + 0.5;
      const v = tNorm;
      uvs.push(Math.max(0, Math.min(1, u)), v);
    });
  }

  // Connect slice quads with outward normals
  for (let s = 0; s < numSlices; s++) {
    const rowA = s * 6;
    const rowB = (s + 1) * 6;

    for (let p = 0; p < 5; p++) {
      const a1 = rowA + p;
      const a2 = rowA + p + 1;
      const b1 = rowB + p;
      const b2 = rowB + p + 1;

      indices.push(a1, b1, a2);
      indices.push(a2, b1, b2);
    }
  }

  // Top cap (slanted ramp entry)
  indices.push(0, 1, 2);
  indices.push(0, 2, 3);
  indices.push(0, 3, 5);
  indices.push(3, 4, 5);

  // Bottom butt cap (fully closed end face with downward normals)
  const lastRow = numSlices * 6;
  indices.push(lastRow + 0, lastRow + 2, lastRow + 1);
  indices.push(lastRow + 0, lastRow + 3, lastRow + 2);
  indices.push(lastRow + 0, lastRow + 5, lastRow + 3);
  indices.push(lastRow + 3, lastRow + 5, lastRow + 4);

  // Back wall (touching the tang) to form a 100% closed, solid watertight mesh
  for (let s = 0; s < numSlices; s++) {
    const rowA = s * 6;
    const rowB = (s + 1) * 6;
    indices.push(rowA + 0, rowB + 0, rowA + 5);
    indices.push(rowA + 5, rowB + 0, rowB + 5);
  }

  geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();

  return geom;
}

export function BladeModel() {
  const {
    material,
    handle,
    design,
    color,
    layers,
    finish,
    showWoodGrain,
    show3DLayers,
    customLogoUrl
  } = useConfiguratorStore();

  const groupRef = useRef();

  // Symmetric Blade Head Geometry
  const bladeGeometry = useMemo(() => {
    const shape = createSymmetricPaddleShape(handle);
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.058, // 5.8mm tournament thickness
      bevelEnabled: true,
      bevelSegments: 5,
      bevelSize: 0.007,
      bevelThickness: 0.007,
      curveSegments: 96
    });

    const pos = geom.attributes.position;
    const uvs = new Float32Array(pos.count * 2);

    // Map X from [-0.75, +0.75] to [0.03, 0.97]
    // Map Y from [-0.75, +0.78] to [0.03, 0.97]
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const u = ((x + 0.75) / 1.50) * 0.94 + 0.03;
      const v = ((y + 0.75) / 1.53) * 0.94 + 0.03;
      uvs[i * 2] = THREE.MathUtils.clamp(u, 0, 1);
      uvs[i * 2 + 1] = THREE.MathUtils.clamp(v, 0, 1);
    }

    geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geom.computeVertexNormals();
    return geom;
  }, [handle]);

  // Standard ergonomic handle scale geometry (used for both Front and Back!)
  const handleScaleGeom = useMemo(() => {
    return createErgonomicHandleScale(handle);
  }, [handle]);

  // Procedural wood textures
  const faceTexture = useMemo(() => {
    return generateBladeFaceTexture({
      material,
      design,
      colorTheme: color,
      showWoodGrain,
      customLogoUrl
    });
  }, [material, design, color, showWoodGrain, customLogoUrl]);

  const edgeTexture = useMemo(() => {
    return generateLayeredEdgeTexture(layers);
  }, [layers]);

  const handleTexture = useMemo(() => {
    return generateHandleTexture();
  }, []);

  // Recessed metallic lens emblem with chrome bezel ("TT Blade Pro" as in Image 1)
  const lensTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 192;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 512, 192);

    ctx.fillStyle = '#0F1014';
    ctx.beginPath();
    ctx.roundRect(8, 8, 496, 176, 88);
    ctx.fill();

    const chromeGrad = ctx.createLinearGradient(0, 0, 512, 192);
    chromeGrad.addColorStop(0, '#EAEAF2');
    chromeGrad.addColorStop(0.35, '#9A9AA8');
    chromeGrad.addColorStop(0.7, '#FFFFFF');
    chromeGrad.addColorStop(1, '#7C7C88');
    ctx.strokeStyle = chromeGrad;
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(18, 18, 476, 156, 78);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 48px Impact, sans-serif';
    ctx.fillText('TT', 140, 96);

    ctx.fillStyle = '#FF202D';
    ctx.beginPath();
    ctx.arc(195, 96, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 36px system-ui, sans-serif';
    ctx.fillText('Blade Pro', 320, 96);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Butt cap emblem (small metallic seal on handle base)
  const buttEmblemTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 384;
    canvas.height = 192;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 384, 192);

    ctx.fillStyle = '#111216';
    ctx.beginPath();
    ctx.roundRect(10, 10, 364, 172, 86);
    ctx.fill();

    const silverGrad = ctx.createLinearGradient(0, 0, 384, 192);
    silverGrad.addColorStop(0, '#EAEAF2');
    silverGrad.addColorStop(0.4, '#9C9CA8');
    silverGrad.addColorStop(0.8, '#F6F6FC');
    silverGrad.addColorStop(1, '#7C7C88');
    ctx.strokeStyle = silverGrad;
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(20, 20, 344, 152, 76);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 40px Impact, sans-serif';
    ctx.fillText('TT', 120, 96);

    ctx.fillStyle = '#FF202D';
    ctx.beginPath();
    ctx.arc(162, 96, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 32px system-ui, sans-serif';
    ctx.fillText('PRO', 240, 96);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Material shaders
  const faceMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      map: faceTexture,
      roughness: finish.roughness,
      metalness: finish.metalness,
      clearcoat: finish.id === 'glossy' || finish.id === 'premium' ? 0.75 : 0.08,
      clearcoatRoughness: 0.12,
      reflectivity: 0.6,
      side: THREE.DoubleSide
    });
  }, [faceTexture, finish]);

  const edgeMaterial = useMemo(() => {
    if (!show3DLayers) {
      return faceMaterial;
    }
    return new THREE.MeshStandardMaterial({
      map: edgeTexture,
      roughness: 0.65,
      metalness: 0.04,
      side: THREE.DoubleSide
    });
  }, [edgeTexture, faceMaterial, show3DLayers]);

  const bladeMaterials = useMemo(() => {
    return [faceMaterial, edgeMaterial];
  }, [faceMaterial, edgeMaterial]);

  const handleMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      map: handleTexture,
      roughness: 0.38,
      metalness: 0.06,
      clearcoat: 0.35,
      clearcoatRoughness: 0.18,
      side: THREE.DoubleSide
    });
  }, [handleTexture]);

  const lensMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: lensTexture,
      metalness: 0.9,
      roughness: 0.18,
      transparent: true,
      alphaTest: 0.05,
      depthWrite: false,
      side: THREE.DoubleSide
    });
  }, [lensTexture]);

  const buttLensMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: buttEmblemTexture,
      metalness: 0.9,
      roughness: 0.18,
      transparent: true,
      alphaTest: 0.05,
      depthWrite: false,
      side: THREE.DoubleSide
    });
  }, [buttEmblemTexture]);

  return (
    <group ref={groupRef} position={[0, 0.45, 0]}>
      {/* 1. Symmetric Blade Head & Tang Sandwich */}
      <mesh
        geometry={bladeGeometry}
        material={bladeMaterials}
        position={[0, 0, -0.029]} // Center the 0.058 thickness around Z=0
        castShadow
        receiveShadow
      />

      {/* 2. Front Ergonomic Handle Scale (with 35° thumb bevel & chamfers) */}
      <group position={[0, 0, 0.029]}>
        <mesh
          geometry={handleScaleGeom}
          material={handleMaterial}
          castShadow
          receiveShadow
        />

        {/* Inlaid Oval Metallic Brand Badge on lower third */}
        <mesh position={[0, -1.40, 0.077]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.24, 0.085]} />
          <primitive object={lensMaterial} attach="material" />
        </mesh>
      </group>

      {/* 3. Back Ergonomic Handle Scale (180° Y-rotation around center) */}
      <group position={[0, 0, -0.029]} rotation={[0, Math.PI, 0]}>
        <mesh
          geometry={handleScaleGeom}
          material={handleMaterial}
          castShadow
          receiveShadow
        />

        {/* Back handle badge */}
        <mesh position={[0, -1.40, 0.077]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.24, 0.085]} />
          <primitive object={lensMaterial} attach="material" />
        </mesh>
      </group>

      {/* 4. Flush Metallic Logo Emblem on Handle Butt Face */}
      <mesh position={[0, -1.771, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.18, 0.09]} />
        <primitive object={buttLensMaterial} attach="material" />
      </mesh>
    </group>
  );
}
