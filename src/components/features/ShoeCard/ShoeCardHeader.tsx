import React from 'react';
import { Check } from 'lucide-react';

interface ShoeCardHeaderProps {
  goal: string;
  isSelected: boolean;
  onToggle: () => void;
  badgeStyle: React.CSSProperties;
}

export function ShoeCardHeader({ goal, isSelected, onToggle, badgeStyle }: Readonly<ShoeCardHeaderProps>) {
  return (
    <div className="flex justify-between items-start mb-3 z-10">
      <span className="text-[11px] px-3 py-1 rounded-full font-extrabold inline-flex items-center tracking-wide shadow-sm" style={badgeStyle}>
        {goal}
      </span>
      <label className="flex items-center cursor-pointer relative group/check">
        <input
          type="checkbox"
          className="appearance-none w-6 h-6 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 checked:bg-orange-500 checked:border-orange-500 transition-all cursor-pointer shadow-sm group-hover/check:scale-110"
          checked={isSelected}
          onChange={onToggle}
        />
        {isSelected && (
          <span className="absolute text-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Check size={14} strokeWidth={4} />
          </span>
        )}
      </label>
    </div>
  );
}
