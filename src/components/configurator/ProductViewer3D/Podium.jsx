import React from 'react';
import * as THREE from 'three';

export function Podium() {
  return (
    <group position={[0, -0.92, 0]}>
      {/* Outer base tier */}
      <mesh receiveShadow position={[0, -0.08, 0]}>
        <cylinderGeometry args={[2.5, 2.7, 0.16, 64]} />
        <meshStandardMaterial
          color="#0B0D14"
          roughness={0.7}
          metalness={0.4}
        />
      </mesh>

      {/* Main upper platform */}
      <mesh receiveShadow position={[0, 0.02, 0]}>
        <cylinderGeometry args={[2.2, 2.35, 0.08, 64]} />
        <meshStandardMaterial
          color="#12151F"
          roughness={0.5}
          metalness={0.6}
        />
      </mesh>

      {/* Inner sunken carbon disc */}
      <mesh receiveShadow position={[0, 0.065, 0]}>
        <cylinderGeometry args={[1.9, 1.9, 0.02, 64]} />
        <meshStandardMaterial
          color="#08090D"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Glowing Red Neon Ring matching reference */}
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.74, 1.83, 64]} />
        <meshBasicMaterial
          color="#FF202D"
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Soft ambient red glow under the stage */}
      <pointLight
        position={[0, 0.15, 0]}
        color="#FF202D"
        intensity={0.85}
        distance={2.8}
        decay={2}
      />
    </group>
  );
}
