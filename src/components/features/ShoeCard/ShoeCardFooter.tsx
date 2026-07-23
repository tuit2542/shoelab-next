import React from 'react';
import { Shoe } from '@/types';
import { ShoppingBag, ExternalLink, TestTube } from 'lucide-react';
import { getSmartBuyUrl } from '@/hooks/useShoes';

interface ShoeCardFooterProps {
  shoe: Shoe;
  onOpenLabReport?: (shoe: Shoe) => void;
}

export function ShoeCardFooter({ shoe, onOpenLabReport }: Readonly<ShoeCardFooterProps>) {
  const buyUrl = getSmartBuyUrl(shoe);
  const storeName = shoe.storeName || `${shoe.brand} Official Store`;

  return (
    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50 flex flex-col gap-2.5">
      <div className="flex justify-between items-baseline">
        <span className="text-xs text-slate-400 dark:text-slate-400 font-bold">ราคาประเมิน</span>
        <span className="text-xl font-extrabold text-orange-600 dark:text-orange-400">{shoe.price}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <a
          href={buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={`สั่งซื้อที่ ${storeName}`}
          className="py-2.5 px-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 shadow-md shadow-orange-500/20 active:scale-95 transition-all"
        >
          <ShoppingBag size={14} />
          <span>สั่งซื้อ</span>
          <ExternalLink size={12} className="opacity-80" />
        </a>

        {onOpenLabReport && (
          <button
            onClick={() => onOpenLabReport(shoe)}
            className="py-2.5 px-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors border border-slate-200/80 dark:border-slate-600/60"
          >
            <TestTube size={14} className="text-orange-500" />
            <span>Lab Report</span>
          </button>
        )}
      </div>
    </div>
  );
}
