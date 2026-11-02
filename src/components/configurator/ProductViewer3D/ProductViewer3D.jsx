import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import toast from 'react-hot-toast';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Camera,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import { BladeModel } from './BladeModel';
import { Podium } from './Podium';
import { SceneLighting } from './SceneLighting';
import { useConfiguratorStore } from '../../../store/configuratorStore';

// Camera position targets for each viewing preset
const VIEW_PRESETS = {
  perspective: {
    // 45-degree angle closely matching Image 2 (Head top-left, handle bottom-right)
    position: new THREE.Vector3(0.5, 1.1, 3.4),
    target: new THREE.Vector3(0, 0.25, 0)
  },
  front: {
    // Direct frontal face view
    position: new THREE.Vector3(0, 0.30, 3.5),
    target: new THREE.Vector3(0, 0.30, 0)
  },
  back: {
    // Rear face view
    position: new THREE.Vector3(0, 0.30, -3.5),
    target: new THREE.Vector3(0, 0.30, 0)
  },
  side: {
    // Edge ply inspection view
    position: new THREE.Vector3(3.5, 0.30, 0.1),
    target: new THREE.Vector3(0, 0.30, 0)
  },
  handle: {
    // Close-up on handle ergonomics & badge matching Image 2
    position: new THREE.Vector3(0.55, -0.3, 1.8),
    target: new THREE.Vector3(0.15, -0.55, 0.2)
  }
};

const VIEW_KEYS = ['front', 'back', 'side', 'perspective', 'handle'];

/**
 * Smoothly interpolates camera position and OrbitControls target
 */
function CameraController({ activeAngle, resetTrigger }) {
  const { camera } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    const preset = VIEW_PRESETS[activeAngle] || VIEW_PRESETS.perspective;
    let startTime = null;
    const duration = 800; // ms
    const startPos = camera.position.clone();
    const targetPos = preset.position;

    let animId;
    function animate(time) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      camera.position.lerpVectors(startPos, targetPos, ease);

      if (controlsRef.current) {
        controlsRef.current.target.lerp(preset.target, ease);
        controlsRef.current.update();
      }

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    }

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [activeAngle, resetTrigger, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={1.2}
      maxDistance={6.0}
      maxPolarAngle={Math.PI / 2 + 0.08} // don't dip below floor
      target={[0, 0.25, 0]}
    />
  );
}

/**
 * Animated blade slant resting naturally on the podium
 */
function PaddleStageGroup({ isAutoRotating }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (isAutoRotating && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Tilted orientation matching Image 2: Head pointing top-left, handle pointing bottom-right */}
      <group rotation={[-0.42, -0.32, 0.48]} position={[-0.12, 0.28, 0]}>
        <BladeModel />
      </group>
      <Podium />
    </group>
  );
}

export function ProductViewer3D() {
  const {
    activeAngleView,
    setActiveAngleView,
    isAutoRotating,
    toggleAutoRotate,
    cameraResetTrigger,
    resetCamera,
    material,
    handle
  } = useConfiguratorStore();

  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canvasRef, setCanvasRef] = useState(null);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Cycle angle via left/right arrows
  const cycleAngle = (direction) => {
    const currentIndex = VIEW_KEYS.indexOf(activeAngleView);
    let nextIndex;
    if (direction === 'prev') {
      nextIndex = (currentIndex - 1 + VIEW_KEYS.length) % VIEW_KEYS.length;
    } else {
      nextIndex = (currentIndex + 1) % VIEW_KEYS.length;
    }
    setActiveAngleView(VIEW_KEYS[nextIndex]);
  };

  // High-Resolution PNG Export
  const handleExportPNG = () => {
    try {
      const canvas = containerRef.current.querySelector('canvas');
      if (!canvas) {
        toast.error('Viewer canvas not ready for capture');
        return;
      }
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `TT-Blade-Pro-${material.name}-${handle.name}-custom.png`;
      link.href = dataUrl;
      link.click();
      toast.success('High-resolution render exported successfully!', {
        icon: '📸',
        style: { background: '#171B25', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      });
    } catch {
      toast.error('Failed to export render');
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[480px] lg:min-h-[640px] flex flex-col items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-b from-[#0B0D14] via-[#08090D] to-[#040507] border border-white/10 select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
    >
      {/* 360° Indicator badge at top right (matching reference image) */}
      <div className="absolute top-5 right-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-semibold text-white/90 shadow-lg pointer-events-none">
        <svg
          className="w-4 h-4 text-[#FF202D] animate-spin"
          style={{ animationDuration: '8s' }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
        <span>360° Interactive</span>
      </div>

      {/* Floating Toolbar Controls (top left) */}
      <div className="absolute top-5 left-6 z-10 flex items-center gap-2">
        <button
          onClick={resetCamera}
          title="Reset Camera View"
          className="p-2.5 rounded-xl bg-[#171B25]/80 hover:bg-[#1E2330] text-white/80 hover:text-white border border-white/10 transition-all shadow-md active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={toggleAutoRotate}
          title={isAutoRotating ? 'Pause Rotation' : 'Auto Rotate'}
          className={`p-2.5 rounded-xl border transition-all shadow-md active:scale-95 ${
            isAutoRotating
              ? 'bg-[#FF202D] text-white border-[#FF202D] glow-red-sm'
              : 'bg-[#171B25]/80 hover:bg-[#1E2330] text-white/80 hover:text-white border-white/10'
          }`}
        >
          {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          onClick={handleExportPNG}
          title="Export High-Res PNG"
          className="p-2.5 rounded-xl bg-[#171B25]/80 hover:bg-[#1E2330] text-white/80 hover:text-white border border-white/10 transition-all shadow-md active:scale-95 flex items-center gap-1.5 text-xs font-medium"
        >
          <Camera className="w-4 h-4 text-[#FF202D]" />
          <span className="hidden sm:inline">Export PNG</span>
        </button>

        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          className="p-2.5 rounded-xl bg-[#171B25]/80 hover:bg-[#1E2330] text-white/80 hover:text-white border border-white/10 transition-all shadow-md active:scale-95"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Angle Navigation Arrows: Left and Right (matching reference image) */}
      <button
        onClick={() => cycleAngle('prev')}
        title="Previous View"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 hover:bg-[#FF202D] text-white/80 hover:text-white border border-white/10 hover:border-[#FF202D] transition-all shadow-xl backdrop-blur-md active:scale-90"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => cycleAngle('next')}
        title="Next View"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 hover:bg-[#FF202D] text-white/80 hover:text-white border border-white/10 hover:border-[#FF202D] transition-all shadow-xl backdrop-blur-md active:scale-90"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Interactive 3D Canvas */}
      <div className="w-full h-full flex-1">
        <Canvas
          shadows
          gl={{
            preserveDrawingBuffer: true,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          }}
          camera={{
            position: [1.6, 1.2, 3.0],
            fov: 42,
            near: 0.1,
            far: 50
          }}
          onCreated={({ gl }) => setCanvasRef(gl)}
        >
          <Suspense fallback={null}>
            <SceneLighting />
            <PaddleStageGroup isAutoRotating={isAutoRotating} />
            <ContactShadows
              position={[0, -0.94, 0]}
              opacity={0.75}
              scale={6}
              blur={2.2}
              far={3.0}
            />
            <CameraController
              activeAngle={activeAngleView}
              resetTrigger={cameraResetTrigger}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Multiple Angle Product Preview Thumbnails (matching reference image) */}
      <div className="absolute bottom-5 z-10 flex items-center justify-center gap-3 px-4 py-2 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 shadow-2xl max-w-[95%] overflow-x-auto">
        {/* 1. Front View */}
        <button
          onClick={() => setActiveAngleView('front')}
          className={`group relative flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl border transition-all overflow-hidden ${
            activeAngleView === 'front'
              ? 'border-[#FF202D] bg-[#FF202D]/15 glow-red-sm scale-105'
              : 'border-white/10 bg-[#171B25]/80 hover:border-white/30'
          }`}
          title="Front Face View"
        >
          <div className="w-6 h-8 rounded-full border-2 border-amber-200/60 bg-amber-200/20 mb-1 flex items-center justify-center">
            <span className="text-[7px] text-amber-200/80 font-bold">TT</span>
          </div>
          <span className="text-[9px] font-medium text-white/80 group-hover:text-white">Front</span>
        </button>

        {/* 2. Back View */}
        <button
          onClick={() => setActiveAngleView('back')}
          className={`group relative flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl border transition-all overflow-hidden ${
            activeAngleView === 'back'
              ? 'border-[#FF202D] bg-[#FF202D]/15 glow-red-sm scale-105'
              : 'border-white/10 bg-[#171B25]/80 hover:border-white/30'
          }`}
          title="Back Face View"
        >
          <div className="w-6 h-8 rounded-full border-2 border-amber-300/50 bg-amber-400/10 mb-1" />
          <span className="text-[9px] font-medium text-white/80 group-hover:text-white">Back</span>
        </button>

        {/* 3. Side View (Layer Inspection) */}
        <button
          onClick={() => setActiveAngleView('side')}
          className={`group relative flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl border transition-all overflow-hidden ${
            activeAngleView === 'side'
              ? 'border-[#FF202D] bg-[#FF202D]/15 glow-red-sm scale-105'
              : 'border-white/10 bg-[#171B25]/80 hover:border-white/30'
          }`}
          title="Edge Plies View"
        >
          <div className="w-1.5 h-8 rounded-sm bg-gradient-to-b from-amber-200 via-stone-800 to-amber-200 mb-1" />
          <span className="text-[9px] font-medium text-white/80 group-hover:text-white">Side</span>
        </button>

        {/* 4. 45-degree Perspective View (Default) */}
        <button
          onClick={() => setActiveAngleView('perspective')}
          className={`group relative flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl border transition-all overflow-hidden ${
            activeAngleView === 'perspective'
              ? 'border-[#FF202D] bg-[#FF202D]/15 glow-red-sm scale-105'
              : 'border-white/10 bg-[#171B25]/80 hover:border-white/30'
          }`}
          title="45° Angled Perspective"
        >
          <div className="w-7 h-7 rounded-lg border border-amber-300/60 bg-amber-300/20 rotate-45 mb-1 flex items-center justify-center">
            <div className="w-1.5 h-3 bg-amber-800/80 -rotate-45" />
          </div>
          <span className="text-[9px] font-medium text-white/80 group-hover:text-white">45° View</span>
        </button>

        {/* 5. Handle Close-up View */}
        <button
          onClick={() => setActiveAngleView('handle')}
          className={`group relative flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl border transition-all overflow-hidden ${
            activeAngleView === 'handle'
              ? 'border-[#FF202D] bg-[#FF202D]/15 glow-red-sm scale-105'
              : 'border-white/10 bg-[#171B25]/80 hover:border-white/30'
          }`}
          title="Handle Close-up"
        >
          <div className="w-3.5 h-7 rounded-sm bg-stone-800 border-x border-[#FF202D]/60 mb-1 flex items-end justify-center pb-0.5">
            <div className="w-2 h-1 bg-white/70 rounded-[1px]" />
          </div>
          <span className="text-[9px] font-medium text-white/80 group-hover:text-white">Handle</span>
        </button>
      </div>
    </div>
  );
}

