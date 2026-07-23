import React from 'react';
import { Shoe } from '@/types';
import { Tooltip } from '../../shared/Tooltip';

export function ShoeCardSpecs({ shoe }: Readonly<{ shoe: Shoe }>) {
  return (
    <>
      {/* Title & Brand Info */}
      <div className="mb-4">
        <div className="text-[11px] text-orange-600 dark:text-orange-400 font-extrabold uppercase tracking-wider mb-0.5">
          {shoe.brand}
        </div>
        <h4 className="text-lg font-extrabold leading-snug text-slate-900 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
          {shoe.name}
        </h4>
      </div>

      {/* Key Specifications Grid */}
      <div className="mt-auto space-y-2 text-xs">
        <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-700/50">
          <span className="text-slate-500 dark:text-slate-400 font-medium"><Tooltip label="โฟม" hintKey="foam" /></span>
          <span className="font-bold text-slate-800 dark:text-slate-200 text-right truncate ml-2 max-w-[60%]">{shoe.foam}</span>
        </div>
        <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-700/50">
          <span className="text-slate-500 dark:text-slate-400 font-medium"><Tooltip label="เทคโนโลยี" hintKey="tech" isRightAligned /></span>
          <span className="font-bold text-slate-800 dark:text-slate-200 text-right truncate ml-2 max-w-[50%]">{shoe.tech}</span>
        </div>
        <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-700/50">
          <span className="text-slate-500 dark:text-slate-400 font-medium"><Tooltip label="น้ำหนัก" hintKey="weight" /></span>
          <span className="font-bold text-slate-800 dark:text-slate-200">{shoe.weight} กรัม</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3 pt-1">
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-2 text-center border border-slate-100 dark:border-slate-700/40">
            <div className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase"><Tooltip label="ความหนา" hintKey="stack" isRightAligned /></div>
            <div className="font-extrabold text-slate-800 dark:text-slate-200">{shoe.stack}</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-2 text-center border border-slate-100 dark:border-slate-700/40">
            <div className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase"><Tooltip label="ดรอป" hintKey="drop" /></div>
            <div className="font-extrabold text-slate-800 dark:text-slate-200">{shoe.drop} มม.</div>
          </div>
        </div>
      </div>
    </>
  );
}
