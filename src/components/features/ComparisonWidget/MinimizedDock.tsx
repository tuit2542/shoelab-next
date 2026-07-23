import React from 'react';
import { Shoe } from '@/types';
import { ChevronUp, Trash2, Scale } from 'lucide-react';

interface MinimizedDockProps {
  selectedShoes: Shoe[];
  onExpand: () => void;
  onClear: () => void;
}

export function MinimizedDock({ selectedShoes, onExpand, onClear }: Readonly<MinimizedDockProps>) {
  if (selectedShoes.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 left-5 md:left-auto md:w-auto z-50 flex items-center justify-between gap-4 p-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-800 dark:text-white rounded-2xl shadow-2xl border border-orange-200/80 dark:border-slate-700/80 animate-fade-in transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-orange-50 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-xl border border-orange-200/60 dark:border-orange-500/30">
          <Scale size={18} />
        </div>
        <div>
          <div className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
            <span>เปรียบเทียบสเปคเชิงลึก</span>
            <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-extrabold">
              {selectedShoes.length}/4
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-300 truncate max-w-[200px] md:max-w-[320px]">
            {selectedShoes.map(s => s.name).join(', ')}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onExpand}
          className="px-3.5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95 whitespace-nowrap"
        >
          <ChevronUp size={16} />
          เปิดตารางเปรียบเทียบ
        </button>
        <button
          onClick={onClear}
          title="ล้างข้อมูลทั้งหมด"
          className="p-2 text-slate-400 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
