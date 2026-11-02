import React from 'react';
import { useConfiguratorStore } from '../../../store/configuratorStore';

export function DynamicBladeThumbnail() {
  const { material, handle, design, color, customLogoUrl } = useConfiguratorStore();

  // Resolve base and grain colors
  let faceColor = material.baseColor || '#E8C48E';
  let grainColor = material.darkGrainColor || 'rgba(120, 80, 40, 0.25)';

  // Apply color theme tint if not natural
  if (color && color.id !== 'natural') {
    if (color.id === 'black') faceColor = '#1F1F24';
    else if (color.id === 'dark-walnut') faceColor = '#422F22';
    else if (color.id === 'light-brown') faceColor = '#B88654';
    else if (color.id === 'red') faceColor = '#8A141A';
    else if (color.id === 'blue') faceColor = '#1B3150';
  }

  // Handle path based on handle type (Flared, Straight, Anatomic, Concave)
  let handlePoints = 'M36,46 L47,40 L69,72 L58,78 Z'; // Flared base
  if (handle.id === 'straight') {
    handlePoints = 'M36,46 L46,41 L66,73 L56,78 Z';
  } else if (handle.id === 'anatomic') {
    handlePoints = 'M36,46 Q43,38 48,41 L70,72 Q64,80 57,78 Z';
  } else if (handle.id === 'concave') {
    handlePoints = 'M35,46 Q40,43 46,40 L69,73 Q60,75 58,78 Z';
  }

  return (
    <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-[#0A0C12] relative flex items-center justify-center shadow-lg group">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-white/[0.04] to-transparent pointer-events-none" />

      {/* Red neon arc on stage */}
      <div className="absolute bottom-1 w-16 h-1 rounded-full bg-[#FF202D]/40 blur-[2px]" />

      {/* Dynamic Angled SVG Blade Preview matching uploaded reference image */}
      <svg
        viewBox="0 0 100 85"
        className="w-full h-full transform transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Ground contact shadow */}
          <ellipse id="shadow" cx="50" cy="74" rx="32" ry="8" fill="rgba(0,0,0,0.6)" filter="blur(3px)" />

          {/* Blade Face Gradient */}
          <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="50%" stopColor={faceColor} />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
          </linearGradient>

          {/* Handle Composite Gradient */}
          <linearGradient id="handleWood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3C261A" />
            <stop offset="25%" stopColor="#C89352" />
            <stop offset="35%" stopColor="#25160E" />
            <stop offset="65%" stopColor="#2A1810" />
            <stop offset="75%" stopColor="#C89352" />
            <stop offset="100%" stopColor="#1A0E08" />
          </linearGradient>

          {/* Chrome bezel for lens */}
          <linearGradient id="chromeBezel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>

        {/* Drop shadow */}
        <ellipse cx="48" cy="75" rx="30" ry="6" fill="rgba(0,0,0,0.55)" />

        {/* Angled Table Tennis Blade Assembly */}
        <g transform="rotate(-15, 50, 42)">
          {/* Blade Edge thickness layer */}
          <ellipse
            cx="32"
            cy="36"
            rx="21.5"
            ry="22"
            fill="#B8864E"
            transform="rotate(-25, 32, 36)"
          />

          {/* Main Blade Head Face */}
          <ellipse
            cx="31"
            cy="34"
            rx="21"
            ry="21.5"
            fill={faceColor}
            stroke="rgba(0,0,0,0.25)"
            strokeWidth="0.5"
            transform="rotate(-25, 31, 34)"
          />

          {/* Procedural Wood Grain on mini face */}
          <g opacity="0.35" transform="rotate(-25, 31, 34)">
            {material.id === 'zebrano' ? (
              <>
                <line x1="20" y1="14" x2="20" y2="54" stroke="#382010" strokeWidth="1.5" />
                <line x1="25" y1="13" x2="25" y2="55" stroke="#382010" strokeWidth="1.8" />
                <line x1="31" y1="12" x2="31" y2="56" stroke="#382010" strokeWidth="1.5" />
                <line x1="37" y1="13" x2="37" y2="55" stroke="#382010" strokeWidth="2.0" />
                <line x1="43" y1="14" x2="43" y2="54" stroke="#382010" strokeWidth="1.6" />
              </>
            ) : (
              <>
                <path d="M18,18 Q19,34 18,50" stroke={grainColor} strokeWidth="0.5" fill="none" />
                <path d="M24,14 Q25,34 24,54" stroke={grainColor} strokeWidth="0.6" fill="none" />
                <path d="M30,12 Q31,34 30,56" stroke={grainColor} strokeWidth="0.7" fill="none" />
                <path d="M36,14 Q37,34 36,54" stroke={grainColor} strokeWidth="0.6" fill="none" />
                <path d="M42,18 Q43,34 42,50" stroke={grainColor} strokeWidth="0.5" fill="none" />
              </>
            )}
          </g>

          {/* Design Branding Overlay on mini blade */}
          <g transform="rotate(-25, 31, 34)">
            {design.id === 'classic' && (
              <>
                <text x="31" y="31" textAnchor="middle" fontSize="5.5" fontWeight="900" fontFamily="sans-serif" fill="#141312">TT</text>
                <line x1="26" y1="33" x2="36" y2="33" stroke="#FF202D" strokeWidth="0.6" />
                <text x="31" y="37" textAnchor="middle" fontSize="3" fontWeight="800" fontFamily="sans-serif" fill="#141312">TT Blade Pro</text>
                <text x="31" y="40" textAnchor="middle" fontSize="1.8" fontWeight="600" fontFamily="sans-serif" fill="#443E38">Custom Made</text>
              </>
            )}

            {design.id === 'carbon' && (
              <>
                <rect x="25" y="16" width="12" height="36" fill="rgba(15,15,18,0.7)" />
                <text x="31" y="35" textAnchor="middle" fontSize="2.8" fontWeight="900" fill="#FF202D" fontFamily="monospace">CARBON</text>
              </>
            )}

            {design.id === 'wave' && (
              <path d="M15,40 Q31,30 47,44" stroke="#FF202D" strokeWidth="1.8" fill="none" />
            )}

            {design.id === 'minimal' && (
              <circle cx="31" cy="38" r="1.5" fill="#141312" />
            )}

            {design.id === 'custom-logo' && customLogoUrl && (
              <image href={customLogoUrl} x="23" y="27" width="16" height="14" preserveAspectRatio="xMidYMid meet" />
            )}
          </g>

          {/* Ergonomic Handle Body matching user selected handle */}
          {/* Back scale / Core tang shadow */}
          <path
            d="M37,45 L48,39 L71,71 L60,77 Z"
            fill="#1E140D"
          />

          {/* Front Handle Scale with Thumb Ramp & Chamfer */}
          <path
            d={
              handle.id === 'straight'
                ? 'M34,44 L45,39 L66,71 L55,76 Z'
                : handle.id === 'anatomic'
                ? 'M34,44 Q42,36 46,39 L69,70 Q62,78 55,76 Z'
                : handle.id === 'concave'
                ? 'M33,44 Q39,41 44,38 L68,71 Q59,73 56,76 Z'
                : 'M34,44 L45,39 L68,70 L57,76 Z' // Flared default
            }
            fill="url(#handleWood)"
            stroke="#150C07"
            strokeWidth="0.6"
          />

          {/* Top 35° Thumb Bevel Ramp facet */}
          <polygon
            points="34,44 45,39 42,43 36,46"
            fill="#1C110A"
            opacity="0.9"
          />

          {/* Inlaid Oval Metallic Brand Emblem Badge */}
          <ellipse
            cx="54"
            cy="60"
            rx="5.2"
            ry="2.6"
            fill="#111114"
            stroke="url(#chromeBezel)"
            strokeWidth="0.6"
            transform="rotate(33, 54, 60)"
          />
          <text
            x="54"
            y="61"
            textAnchor="middle"
            fontSize="1.6"
            fontWeight="bold"
            fill="#FFFFFF"
            transform="rotate(33, 54, 60)"
          >
            TT PRO
          </text>

          {/* Butt end cap slice */}
          <ellipse
            cx="62.5"
            cy="73"
            rx="4.2"
            ry="1.8"
            fill="#141416"
            stroke="#C89352"
            strokeWidth="0.5"
            transform="rotate(33, 62.5, 73)"
          />
        </g>
      </svg>
    </div>
  );
}

