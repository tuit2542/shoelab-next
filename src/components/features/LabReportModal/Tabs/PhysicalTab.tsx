import React from 'react';
import { Shoe } from '@/types';
import { Thermometer, Zap, Award } from 'lucide-react';
import { STYLES } from '../styles';
import { ShoeVisualRender } from '@/components/shared/ShoeVisualRender';

interface PhysicalTabProps {
  shoe: Shoe;
  phys: any; // We can use the return type of createPhysicalMetrics or any
}

export function PhysicalTab({ shoe, phys }: Readonly<PhysicalTabProps>) {
  if (!phys) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Shoe Schematic Visual */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-inner flex flex-col items-center justify-center gap-2">
        <span className="text-slate-400 text-xs font-mono uppercase tracking-widest">Shoe Schematic Diagram</span>
        <div className="w-full max-w-md h-40">
          <ShoeVisualRender shoe={shoe} className="h-full w-full" />
        </div>
      </div>

      {/* Stack & Softness Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Midsole Softness & Freezer Test */}
        <div className={`${STYLES.card} space-y-3`}>
          <div className={STYLES.cardHeaderWrapper}>
            <h4 className={STYLES.cardHeaderTitle}>
              <Thermometer className="text-blue-500" size={18} />
              ความนุ่มโฟมและการแข็งตัว (Softness & Cold Test)
            </h4>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">Asker C</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-100 text-center">
              <span className="text-xs text-orange-600 font-semibold block">อุณหภูมิห้อง (23°C)</span>
              <span className={STYLES.statValueLg}>{phys.midsoleSoftnessRoomAskerC}</span>
              <span className={`${STYLES.statSubLabel} mt-0.5`}>(นุ่มมาก &lt; 20)</span>
            </div>
            <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 text-center">
              <span className="text-xs text-blue-600 font-semibold block">สภาวะแช่แข็ง (-10°C)</span>
              <span className={STYLES.statValueLg}>{phys.midsoleSoftnessColdAskerC}</span>
              <span className="text-[10px] text-blue-600 font-bold block mt-0.5">+{phys.hardnessStiffeningPercent}% แข็งขึ้น</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            💡 โฟม {shoe.foam} มีอัตราการแข็งตัวเมื่อเจออากาศเย็นเพียง <strong>{phys.hardnessStiffeningPercent}%</strong> ซึ่งคงประสิทธิภาพความนุ่มได้สม่ำเสมอในทุกสภาพอากาศ
          </p>
        </div>

        {/* Energy Return & Shock Absorption */}
        <div className={`${STYLES.card} space-y-3`}>
          <div className={STYLES.cardHeaderWrapper}>
            <h4 className={STYLES.cardHeaderTitle}>
              <Zap className="text-amber-500" size={18} />
              การคืนพลังงานและการดูดซับแรงกระแทก
            </h4>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600">การคืนพลังงาน (Energy Return)</span>
                <span className="text-orange-600 font-extrabold text-sm">{phys.energyReturnPercent}%</span>
              </div>
              <div className={STYLES.progressBarBg}>
                <div
                  className="bg-gradient-to-r from-orange-400 to-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${phys.energyReturnPercent}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600">การดูดซับแรง (Shock Absorption)</span>
                <span className="text-emerald-600 font-extrabold text-sm">{phys.shockAbsorptionPercent}%</span>
              </div>
              <div className={STYLES.progressBarBg}>
                <div
                  className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${phys.shockAbsorptionPercent}%` }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
            <Award size={14} className="text-amber-500" />
            <span>ผลการทดสอบแรงดีดเด้งอยู่ในเกณฑ์ <strong>{phys.energyReturnPercent > 85 ? 'ระดับท็อป (Superfoam Class)' : 'ระดับมาตรฐานการซ้อม'}</strong></span>
          </div>
        </div>
      </div>

      {/* Physical Dimensions & Platform Width */}
      <div className={`${STYLES.card} space-y-4`}>
        <h4 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
          📏 มิติพื้นรองเท้าและความต้านทานการงอ (Stiffness & Platform Geometry)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className={STYLES.statBox}>
            <span className={STYLES.statLabel}>ความหนาส้น/หน้าเท้า</span>
            <span className={STYLES.statValue}>{phys.stackHeelMm} / {phys.stackForefootMm} มม.</span>
            <span className={STYLES.statSubLabel}>Drop แท้จริง: {phys.stackDropMm} มม.</span>
          </div>
          <div className={STYLES.statBox}>
            <span className={STYLES.statLabel}>แรงต้านการงอ (Stiffness)</span>
            <span className={STYLES.statValue}>{phys.bendingStiffnessN} N</span>
            <span className="text-[10px] text-orange-600 font-semibold block">{phys.carbonPlateType}</span>
          </div>
          <div className={STYLES.statBox}>
            <span className={STYLES.statLabel}>ความกว้างฐานหน้าเท้า</span>
            <span className={STYLES.statValue}>{phys.platformForefootMm} มม.</span>
          </div>
          <div className={STYLES.statBox}>
            <span className={STYLES.statLabel}>ความกว้างฐานส้นเท้า</span>
            <span className={STYLES.statValue}>{phys.platformHeelMm} มม.</span>
          </div>
        </div>
      </div>

      {/* Functional Attributes: Traction & Durability */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={STYLES.cardSmall}>
          <span className={STYLES.statLabelMd}>การยึดเกาะพื้นแห้ง/เปียก (CoF)</span>
          <div className="flex justify-center items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-800">{phys.tractionDryCoF}</span>
            <span className="text-xs text-slate-400">Dry</span>
            <span className="text-slate-300">/</span>
            <span className="text-xl font-extrabold text-blue-600">{phys.tractionWetCoF}</span>
            <span className="text-xs text-slate-400">Wet</span>
          </div>
        </div>
        <div className={STYLES.cardSmall}>
          <span className={STYLES.statLabelMd}>ประสิทธิภาพการระบายอากาศ</span>
          <span className="text-2xl font-extrabold text-emerald-600">{phys.breathabilityScore} / 10</span>
        </div>
        <div className={STYLES.cardSmall}>
          <span className={STYLES.statLabelMd}>ความทนทานของยางพื้นนอก</span>
          <span className="text-2xl font-extrabold text-orange-600">{phys.durabilityScore} / 10</span>
        </div>
      </div>
    </div>
  );
}
