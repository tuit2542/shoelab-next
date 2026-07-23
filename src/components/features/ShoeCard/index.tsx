import React from 'react';
import { Shoe } from '@/types';
import { ShoeCardHeader } from './ShoeCardHeader';
import { ShoeCardVisual } from './ShoeCardVisual';
import { ShoeCardSpecs } from './ShoeCardSpecs';
import { ShoeCardFooter } from './ShoeCardFooter';

interface ShoeCardProps {
  shoe: Shoe;
  isSelected: boolean;
  onToggle: (id: string) => void;
  onOpenLabReport?: (shoe: Shoe) => void;
}

const getValidHex = (colorStr: string) => {
  if (!colorStr) return ['#94a3b8'];
  let str = String(colorStr).trim();
  let colors: string[] = []; 
  if (str.startsWith('[') && str.endsWith(']')) {
    try {
      const parsed = JSON.parse(str.replace(/'/g, '"')); 
      if (Array.isArray(parsed)) colors = parsed;
    } catch {
      const matches = str.match(/#[0-9a-fA-F]{3,6}/g);
      if (matches) colors = matches;
    }
  } else {
    colors = str.split(',').map(c => c.trim());
  }

  if (colors.length === 0) return ['#94a3b8'];

  const validColors = colors.map(c => {
    let hex = c;
    if (!hex.startsWith('#')) hex = '#' + hex;
    if (hex.length === 4) {
      hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    if (/^#[0-9A-Fa-f]{6}$/i.test(hex)) {
      const r = Number.parseInt(hex.slice(1, 3), 16);
      const g = Number.parseInt(hex.slice(3, 5), 16);
      const b = Number.parseInt(hex.slice(5, 7), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      if (brightness > 230) return '#64748b';
      return hex;
    }
    return null;
  }).filter(c => c !== null) as string[];

  return validColors.length > 0 ? validColors : ['#94a3b8'];
};

export function ShoeCard({ shoe, isSelected, onToggle, onOpenLabReport }: Readonly<ShoeCardProps>) {
  const colors = getValidHex(shoe.color);

  let badgeStyle = {};
  if (colors.length >= 2) {
    badgeStyle = {
      background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
      color: '#ffffff',
      textShadow: '0px 1px 3px rgba(0,0,0,0.6)',
      border: '1px solid rgba(0,0,0,0.1)'
    };
  } else {
    badgeStyle = {
      backgroundColor: colors[0] + '18',
      color: colors[0],
      border: `1px solid ${colors[0]}40`
    };
  }

  return (
    <div
      className={`relative bg-white dark:bg-slate-800/90 rounded-3xl p-5 shadow-sm border transition-all duration-300 hover:shadow-xl dark:hover:shadow-slate-950/60 hover:-translate-y-1 group flex flex-col h-full overflow-hidden ${
        isSelected
          ? 'border-orange-500 ring-2 ring-orange-500/40 dark:ring-orange-500/50'
          : 'border-slate-100 dark:border-slate-700/60'
      }`}
    >
      {/* Dynamic Background Glow Accent */}
      <div
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-15 pointer-events-none group-hover:opacity-35 transition-opacity duration-500"
        style={{ backgroundColor: colors[0] }}
      />
      
      <ShoeCardHeader goal={shoe.goal} isSelected={isSelected} onToggle={() => onToggle(shoe.id)} badgeStyle={badgeStyle} />
      <ShoeCardVisual shoe={shoe} />
      <ShoeCardSpecs shoe={shoe} />
      <ShoeCardFooter shoe={shoe} onOpenLabReport={onOpenLabReport} />
    </div>
  );
}
