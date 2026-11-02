import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { HANDLE_TYPES } from '../../../data/handles';
import { useConfiguratorStore } from '../../../store/configuratorStore';

export function HandleSelector() {
  const { handle, setHandle } = useConfiguratorStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-3">
      {/* Header matching Image 3 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#FF202D] text-white text-xs font-bold flex items-center justify-center">
            2
          </span>
          <h3 className="text-sm font-semibold text-white tracking-wide">Handle Type</h3>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-xs text-white/50 hover:text-white flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <span className="text-[#FF202D]">→</span>
        </button>
      </div>

      {/* Grid of 4 Handles matching Image 3 */}
      <div className="grid grid-cols-4 gap-2">
        {HANDLE_TYPES.map((h) => {
          const isSelected = handle.id === h.id;
          return (
            <button
              key={h.id}
              onClick={() => setHandle(h)}
              className={`group relative flex flex-col items-center p-2 rounded-xl border transition-all text-left ${
                isSelected
                  ? 'border-[#FF202D] bg-[#1C202C] shadow-lg shadow-[#FF202D]/10'
                  : 'border-white/10 bg-[#141822]/70 hover:border-white/20 hover:bg-[#171B25]'
              }`}
            >
              {/* Red checkmark badge when selected */}
              {isSelected && (
                <div className="absolute top-1 right-1 z-10 w-4 h-4 rounded-full bg-[#FF202D] text-white flex items-center justify-center shadow-md">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}

              {/* Realistic handle thumbnail matching Image 3 */}
              <div className="w-full h-14 rounded-lg mb-2 overflow-hidden border border-white/10 bg-[#2A241F] flex items-center justify-center relative shadow-inner">
                {/* Background wood tone warmth */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7C5A3C]/40 via-[#3B291C]/70 to-[#18110B]" />

                {/* Vector accurate 3D handle graphic matching Image 3 */}
                <div className="relative transform -rotate-25 scale-105 flex items-center justify-center">
                  <svg width="28" height="48" viewBox="0 0 28 48" fill="none">
                    <defs>
                      <linearGradient id={`hg-${h.id}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#25160E" />
                        <stop offset="25%" stopColor="#C89352" />
                        <stop offset="35%" stopColor="#2D1D14" />
                        <stop offset="65%" stopColor="#3E271B" />
                        <stop offset="75%" stopColor="#C89352" />
                        <stop offset="100%" stopColor="#20120A" />
                      </linearGradient>
                      <linearGradient id={`ramp-${h.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#180E08" />
                        <stop offset="100%" stopColor="#3E271B" />
                      </linearGradient>
                    </defs>

                    {/* Specific handle silhouette */}
                    {h.id === 'flared' && (
                      <path
                        d="M8,4 Q14,2 20,4 L18,16 Q13,24 19,44 Q14,46 9,44 L10,16 Z"
                        fill={`url(#hg-${h.id})`}
                        stroke="#140C07"
                        strokeWidth="0.75"
                      />
                    )}
                    {h.id === 'straight' && (
                      <path
                        d="M9,4 L19,4 L19,44 L9,44 Z"
                        fill={`url(#hg-${h.id})`}
                        stroke="#140C07"
                        strokeWidth="0.75"
                      />
                    )}
                    {h.id === 'anatomic' && (
                      <path
                        d="M8,4 L20,4 Q24,24 19,44 Q14,45 9,44 Q4,24 8,4 Z"
                        fill={`url(#hg-${h.id})`}
                        stroke="#140C07"
                        strokeWidth="0.75"
                      />
                    )}
                    {h.id === 'concave' && (
                      <path
                        d="M7,4 L21,4 Q15,20 20,44 Q14,46 8,44 Q13,20 7,4 Z"
                        fill={`url(#hg-${h.id})`}
                        stroke="#140C07"
                        strokeWidth="0.75"
                      />
                    )}

                    {/* Top thumb bevel ramp */}
                    <polygon
                      points="10,4 18,4 16,11 12,11"
                      fill={`url(#ramp-${h.id})`}
                      opacity="0.85"
                    />

                    {/* Metallic badge lens */}
                    <ellipse cx="14" cy="30" rx="3.5" ry="1.6" fill="#141416" stroke="#D1D5DB" strokeWidth="0.6" />
                  </svg>
                </div>
              </div>

              {/* Title & Price */}
              <span className="text-xs font-medium text-white truncate w-full text-center">
                {h.name}
              </span>
              <span className={`text-[11px] font-semibold mt-0.5 ${isSelected ? 'text-[#FF202D]' : 'text-white/50'}`}>
                {h.price === 0 ? '$0' : `+$${h.price}`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-2xl bg-[#171B25] border border-white/15 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FF202D] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  Handle Ergonomics Guide
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Choose the shape matching your grip stability and transition style
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {HANDLE_TYPES.map((h) => {
                const isSelected = handle.id === h.id;
                return (
                  <div
                    key={h.id}
                    onClick={() => {
                      setHandle(h);
                      setIsModalOpen(false);
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#FF202D] bg-[#FF202D]/10'
                        : 'border-white/10 bg-[#11141C] hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{h.name} ({h.shortCode})</span>
                        {isSelected && <Check className="w-4 h-4 text-[#FF202D]" />}
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                          {h.popularity}
                        </span>
                      </div>
                      <p className="text-xs text-white/60 mt-1">{h.description}</p>
                      <p className="text-[11px] text-[#FF202D] mt-1">Best for: {h.bestFor}</p>
                    </div>
                    <span className="text-sm font-bold text-white ml-4 shrink-0">
                      {h.price === 0 ? 'Included' : `+$${h.price}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
