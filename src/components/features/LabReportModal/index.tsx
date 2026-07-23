import React, { useState } from 'react';
import { Shoe } from '@/types';
import { TestTube, Activity, BarChart3, ShoppingBag, ExternalLink } from 'lucide-react';
import { createPhysicalMetrics, createBiomechanicalMetrics, getSmartBuyUrl } from '@/hooks/useShoes';
import { STYLES } from './styles';
import { LabReportHeader } from './LabReportHeader';
import { PhysicalTab } from './Tabs/PhysicalTab';
import { BiomechanicalTab } from './Tabs/BiomechanicalTab';
import { RadarTab } from './Tabs/RadarTab';

interface LabReportModalProps {
  shoe: Shoe | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LabReportModal({ shoe, isOpen, onClose }: Readonly<LabReportModalProps>) {
  const [activeTab, setActiveTab] = useState<'physical' | 'biomechanical' | 'radar'>('physical');

  if (!isOpen || !shoe) return null;

  const phys = shoe.physicalMetrics || createPhysicalMetrics({}, shoe.stack, shoe.weight, shoe.drop, shoe.foam, shoe.tech);
  const bio = shoe.biomechanicalMetrics || createBiomechanicalMetrics({}, shoe.weight, phys.stackHeelMm);
  const buyUrl = getSmartBuyUrl(shoe);
  const storeName = shoe.storeName || `${shoe.brand} Official Store`;

  // Radar Chart helper (normalize metrics 0 - 100)
  const radarAxes = [
    { label: 'Energy Return', val: phys ? phys.energyReturnPercent : 80, max: 100 },
    { label: 'Cushioning', val: phys ? phys.shockAbsorptionPercent : 75, max: 100 },
    { label: 'Softness', val: phys ? Math.max(0, 100 - (phys.midsoleSoftnessRoomAskerC * 2)) : 70, max: 100 },
    { label: 'Flexibility', val: phys ? Math.max(0, 100 - (phys.bendingStiffnessN * 1.5)) : 50, max: 100 },
    { label: 'Traction', val: phys ? Math.round(phys.tractionDryCoF * 100) : 80, max: 100 },
    { label: 'Stability', val: bio ? bio.stabilityRating * 10 : 80, max: 100 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col max-h-[90vh]">
        
        <LabReportHeader shoe={shoe} buyUrl={buyUrl} onClose={onClose} />

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <button
            onClick={() => setActiveTab('physical')}
            className={`${STYLES.tabBtn} ${activeTab === 'physical' ? STYLES.tabActive : STYLES.tabInactive}`}
          >
            <TestTube size={16} />
            1. ข้อมูลกายภาพและวัสดุ (Physical & Material)
          </button>
          <button
            onClick={() => setActiveTab('biomechanical')}
            className={`${STYLES.tabBtn} ${activeTab === 'biomechanical' ? STYLES.tabActive : STYLES.tabInactive}`}
          >
            <Activity size={16} />
            2. ข้อมูลชีวกลศาสตร์ (Biomechanical)
          </button>
          <button
            onClick={() => setActiveTab('radar')}
            className={`${STYLES.tabBtn} ${activeTab === 'radar' ? STYLES.tabActive : STYLES.tabInactive}`}
          >
            <BarChart3 size={16} />
            3. Spider Radar Chart (ภาพรวม)
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-slate-50/30">
          {activeTab === 'physical' && <PhysicalTab shoe={shoe} phys={phys} />}
          {activeTab === 'biomechanical' && <BiomechanicalTab bio={bio} />}
          {activeTab === 'radar' && <RadarTab radarAxes={radarAxes} />}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="text-center md:text-left">* ผลทดสอบโดยเครื่องมือทางวิทยาศาสตร์และ Force Plate ภายใน Shoelab</span>
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            <a
              href={buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all flex-1 md:flex-none"
            >
              <ShoppingBag size={14} />
              <span>สั่งซื้อกับ {storeName}</span>
              <ExternalLink size={12} />
            </a>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-900 dark:bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-sm flex-1 md:flex-none"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
