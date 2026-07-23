import React from 'react';
import { Shoe } from '@/types';
import { Flame } from 'lucide-react';
import { ShoeVisualRender } from '../../shared/ShoeVisualRender';

export function ShoeCardVisual({ shoe }: Readonly<{ shoe: Shoe }>) {
  return (
    <div className="w-full h-44 mb-4 rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100/60 dark:from-slate-900/60 dark:to-slate-900/40 p-2 relative group-hover:bg-slate-100/80 dark:group-hover:bg-slate-900/70 transition-colors">
      <ShoeVisualRender shoe={shoe} className="h-full w-full" />

      {/* Superfoam / Energy return badge badge */}
      {shoe.physicalMetrics && shoe.physicalMetrics.energyReturnPercent >= 85 && (
        <span className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 border border-slate-700">
          <Flame size={12} className="text-amber-400 fill-amber-400" />
          Superfoam {shoe.physicalMetrics.energyReturnPercent}%
        </span>
      )}
    </div>
  );
}
