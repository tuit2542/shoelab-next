import React from 'react';
import { Shoe } from '@/types';
import { X, ShoppingBag, ExternalLink } from 'lucide-react';

interface LabReportHeaderProps {
  shoe: Shoe;
  buyUrl: string;
  onClose: () => void;
}

export function LabReportHeader({ shoe, buyUrl, onClose }: Readonly<LabReportHeaderProps>) {
  return (
    <div className="relative p-6 pr-12 md:pr-16 text-white bg-gradient-to-r from-slate-900 via-slate-800 to-orange-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700/80 rounded-full transition-all hover:scale-105 z-10"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-orange-500/20 text-orange-400 text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-orange-500/30">
              Shoelab Verified Test Report
            </span>
            <span className="text-[10px] sm:text-xs text-slate-300 font-medium bg-white/5 px-2 py-0.5 rounded-full">ID: {shoe.id}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            {shoe.name}
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-300 flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-orange-400 uppercase">{shoe.brand}</span>
            <span className="opacity-50">•</span>
            <span>{shoe.foam}</span>
            <span className="opacity-50">•</span>
            <span>{shoe.tech}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center w-full md:w-auto justify-end mt-2 md:mt-0 shrink-0">
        <a
          href={buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-orange-500/25 active:scale-95 transition-all w-full justify-center md:w-auto"
        >
          <ShoppingBag size={16} />
          <span>สั่งซื้อสินค้า ({shoe.price})</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
