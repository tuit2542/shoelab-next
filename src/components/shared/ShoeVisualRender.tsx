import React, { useState } from 'react';
import { Shoe } from '@/types';

interface ShoeVisualRenderProps {
  shoe: Shoe;
  className?: string;
}

export function ShoeVisualRender({ shoe, className = "h-36 w-full" }: Readonly<ShoeVisualRenderProps>) {
  const [imgError, setImgError] = useState(false);

  // If user provided an image URL, display it with error handling
  if (shoe.image && !imgError && shoe.image.trim().startsWith('http')) {
    return (
      <img
        src={shoe.image}
        alt={shoe.name}
        onError={() => setImgError(true)}
        className={`object-contain max-h-full max-w-full drop-shadow-md group-hover:scale-108 transition-transform duration-500 ease-out ${className}`}
      />
    );
  }

  // High-Tech Stylized Brand Schematic Vector Fallback
  const brand = (shoe.brand || '').toLowerCase();
  const color = (shoe.color?.startsWith('#')) ? shoe.color : '#e17055';
  const stackHeight = Number.parseFloat((shoe.stack || '36').split('/')[0]) || 36;
  const isSuperstack = stackHeight >= 40;

  return (
    <div className={`relative flex flex-col items-center justify-center w-full h-full p-2 select-none ${className}`}>
      {/* Background Mesh */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#e17055_1px,transparent_1px)] [background-size:10px_10px]" />

      {/* Styled High-Tech Running Shoe Vector Graphic */}
      <svg
        viewBox="0 0 200 110"
        className="w-44 h-24 drop-shadow-md group-hover:scale-105 transition-transform duration-500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Upper Mesh Outline */}
        <path
          d="M 25 72 Q 40 42 80 38 Q 120 34 155 48 Q 180 62 185 72 Q 180 75 165 75 Q 80 75 25 72 Z"
          fill={color}
          fillOpacity="0.25"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Stack Midsole Foam Base */}
        <path
          d={isSuperstack 
            ? "M 20 72 Q 70 75 185 72 L 180 92 Q 100 96 25 90 Z" 
            : "M 20 72 Q 70 74 185 72 L 180 86 Q 100 89 25 85 Z"}
          fill="url(#midsoleGrad)"
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />

        {/* Carbon Plate Line / Shank Indicator */}
        {(shoe.tech || '').toLowerCase().includes('carbon') || (shoe.tech || '').toLowerCase().includes('rod') || (shoe.tech || '').toLowerCase().includes('shank') ? (
          <path
            d="M 35 79 Q 90 82 170 78"
            stroke="#f97316"
            strokeWidth="3"
            strokeDasharray="4 2"
          />
        ) : null}

        {/* Brand Specific Iconic Stripes / Graphic */}
        {brand.includes('adidas') && (
          <g stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.85">
            <line x1="98" y1="40" x2="88" y2="68" />
            <line x1="108" y1="38" x2="98" y2="68" />
            <line x1="118" y1="40" x2="108" y2="68" />
          </g>
        )}

        {brand.includes('asics') && (
          <path
            d="M 85 43 C 105 48 125 56 150 66 M 100 40 C 115 53 130 63 155 70"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.85"
          />
        )}

        {brand.includes('anta') && (
          <path
            d="M 80 63 Q 110 38 140 58 L 125 66 Q 105 50 90 66 Z"
            fill={color}
            opacity="0.85"
          />
        )}

        {/* Outsole Grip Rubber */}
        <path
          d="M 22 85 L 182 86"
          stroke="#334155"
          strokeWidth="2.5"
          strokeDasharray="6 3"
        />

        <defs>
          <linearGradient id="midsoleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Brand & Stack Tech Badge */}
      <div className="flex flex-col items-center mt-1 gap-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {shoe.brand} SCHEMATIC
          </span>
          <span className="text-[9px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-1.5 py-0.2 rounded font-mono font-bold">
            {shoe.stack} mm
          </span>
        </div>
        
        {/* Schematic Legend */}
        <div className="flex items-center justify-center gap-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1.5" title="พื้นยางนอก (Outsole Grip)">
            <svg width="12" height="3"><line x1="0" y1="1.5" x2="12" y2="1.5" stroke="#334155" strokeWidth="2.5" strokeDasharray="4 2" /></svg>
            <span className="text-[8px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Outsole</span>
          </div>
          {((shoe.tech || '').toLowerCase().includes('carbon') || (shoe.tech || '').toLowerCase().includes('rod') || (shoe.tech || '').toLowerCase().includes('shank')) && (
            <div className="flex items-center gap-1.5" title="แผ่นคาร์บอน (Carbon Plate/Rods)">
              <svg width="12" height="3"><line x1="0" y1="1.5" x2="12" y2="1.5" stroke="#f97316" strokeWidth="2.5" strokeDasharray="3 2" /></svg>
              <span className="text-[8px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Plate</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
