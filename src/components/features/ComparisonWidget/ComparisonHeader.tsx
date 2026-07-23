import React from 'react';
import { Scale, Trash2, Minimize2, Maximize2, ChevronDown, X } from 'lucide-react';
import { STYLES } from './styles';

interface ComparisonHeaderProps {
  selectedCount: number;
  isFullHeight: boolean;
  onClear: () => void;
  onToggleHeight: () => void;
  onMinimize: () => void;
  onClose: () => void;
}

export function ComparisonHeader({ selectedCount, isFullHeight, onClear, onToggleHeight, onMinimize, onClose }: Readonly<ComparisonHeaderProps>) {
  return (
    <div className={STYLES.header.container}>
      <div className={STYLES.header.titleGroup}>
        <div className="p-2 bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 rounded-xl border border-orange-200/60 dark:border-orange-900/40">
          <Scale size={20} />
        </div>
        <div>
          <h3 className={STYLES.header.title}>
            เปรียบเทียบสเปคเชิงลึก (Deep Comparison)
          </h3>
          <p className={STYLES.header.subtitle}>
            เลือกเปรียบเทียบอยู่ <span className={STYLES.header.subtitleHighlight}>{selectedCount}</span>/4 รุ่น
          </p>
        </div>
      </div>

      <div className={STYLES.header.actionsGroup}>
        <button onClick={onClear} className={STYLES.header.clearBtn}>
          <Trash2 size={14} />
          ล้างทั้งหมด
        </button>
        <button
          onClick={onToggleHeight}
          className={STYLES.header.iconBtn}
          title={isFullHeight ? 'ย่อขนาดความสูง' : 'ขยายเต็มจอ'}
        >
          {isFullHeight ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          <span className="hidden md:inline">{isFullHeight ? 'ย่อหน้าต่าง' : 'ขยายเต็มจอ'}</span>
        </button>
        <button
          onClick={onMinimize}
          className={STYLES.header.iconBtn}
          title="ย่อเก็บไว้ล่างจอ (Minimize)"
        >
          <ChevronDown size={18} />
          <span className="hidden md:inline">ซ่อนบาร์</span>
        </button>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white bg-gray-100 dark:bg-slate-800 rounded-xl transition-colors"
          title="ปิดหน้าต่าง"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
