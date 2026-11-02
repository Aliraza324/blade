import React from 'react';
import { useConfiguratorStore } from '../../../store/configuratorStore';

export function SceneLighting() {
  const { enableRealisticLighting } = useConfiguratorStore();

  if (!enableRealisticLighting) {
    return (
      <>
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 5, 5]} intensity={1.4} />
      </>
    );
  }

  return (
    <>
      {/* Soft Ambient base for clean shadow fill */}
      <ambientLight intensity={0.95} />

      {/* Main Studio Key Light (Front-Top-Right, angled onto blade face) */}
      <directionalLight
        position={[2.5, 4.0, 3.5]}
        intensity={2.0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={12}
        shadow-bias={-0.0003}
      />

      {/* Soft Studio Fill Light (Front-Left, balancing the wood grain highlights) */}
      <directionalLight
        position={[-3.0, 2.5, 3.0]}
        intensity={1.1}
        color="#F8FAFC"
      />

      {/* Crisp Rim Light (Top-Back, illuminating the paddle head roundness curve) */}
      <directionalLight
        position={[0, 4.5, -3.0]}
        intensity={1.5}
        color="#FFFFFF"
      />

      {/* Soft Red Studio Accent Light from side */}
      <spotLight
        position={[4.5, 1.2, 1.0]}
        angle={0.5}
        penumbra={0.9}
        intensity={1.4}
        color="#FF202D"
        distance={9}
      />

      {/* Gentle upward bounce */}
      <directionalLight
        position={[0, -2, 2]}
        intensity={0.25}
        color="#E2E8F0"
      />
    </>
  );
}
