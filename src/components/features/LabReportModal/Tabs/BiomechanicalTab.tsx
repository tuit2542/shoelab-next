import React from 'react';
import { Footprints, Activity } from 'lucide-react';
import { STYLES } from '../styles';

interface BiomechanicalTabProps {
  bio: any;
}

export function BiomechanicalTab({ bio }: Readonly<BiomechanicalTabProps>) {
  if (!bio) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Force Plate GRF Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`${STYLES.card} space-y-3`}>
          <div className={STYLES.cardHeaderWrapper}>
            <h4 className={STYLES.cardHeaderTitle}>
              <Footprints className="text-orange-500" size={18} />
              แรงปฏิกิริยาจากพื้น (Ground Reaction Forces - GRF)
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className={STYLES.statBox}>
              <span className="text-xs text-slate-500 font-semibold block">Peak Vertical GRF</span>
              <span className={STYLES.statValueLg}>{bio.peakGRF_BW} BW</span>
              <span className={`${STYLES.statSubLabel} mt-0.5`}>(เท่าของน้ำหนักตัว)</span>
            </div>
            <div className={STYLES.statBox}>
              <span className="text-xs text-slate-500 font-semibold block">Impact Loading Rate</span>
              <span className="text-2xl font-extrabold text-orange-600">{bio.impactLoadingRate}</span>
              <span className={`${STYLES.statSubLabel} mt-0.5`}>BW/s (อัตราเพิ่มแรง)</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            📊 ค่า Impact Loading Rate ที่ <strong>{bio.impactLoadingRate} BW/s</strong> บ่งบอกระดับความนุ่มและอัตราการกระจายแรงกระแทกเข้าสู่ข้อต่อของนักวิ่งขณะกระทบพื้น
          </p>
        </div>

        {/* Plantar Pressure & Pronation */}
        <div className={`${STYLES.card} space-y-3`}>
          <div className={STYLES.cardHeaderWrapper}>
            <h4 className={STYLES.cardHeaderTitle}>
              <Activity className="text-purple-500" size={18} />
              แรงกดฝ่าเท้าและการเคลื่อนไหวข้อเท้า (Plantar Pressure & Footscan)
            </h4>
          </div>

          <div className="space-y-2 text-sm">
            <div className={STYLES.listItem}>
              <span className="text-slate-500 text-xs">แรงกดสูงสุดฝ่าเท้า (Peak Pressure)</span>
              <span className="font-extrabold text-slate-800">{bio.peakPlantarPressureKPa} kPa</span>
            </div>
            <div className={STYLES.listItem}>
              <span className="text-slate-500 text-xs">พื้นที่สัมผัสฝ่าเท้า (Contact Area)</span>
              <span className="font-extrabold text-slate-800">{bio.contactAreaCm2} cm²</span>
            </div>
            <div className={STYLES.listItem}>
              <span className="text-slate-500 text-xs">ลักษณะการบิดของข้อเท้า (Pronation)</span>
              <span className="font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded text-xs">
                {bio.pronationType} ({bio.pronationAngleDeg}°)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Motion Capture Kinematics */}
      <div className={`${STYLES.card} space-y-4`}>
        <h4 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
          🎥 มุมการเคลื่อนไหวของข้อต่อ (Motion Capture Kinematics)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className={STYLES.statBox}>
            <span className={STYLES.statLabel}>มุมงอข้อเท้า (Ankle Flexion)</span>
            <span className={STYLES.statValue}>{bio.ankleFlexionAngleDeg}°</span>
          </div>
          <div className={STYLES.statBox}>
            <span className={STYLES.statLabel}>มุมงอเข่าขณะลงเท้า</span>
            <span className={STYLES.statValue}>{bio.kneeFlexionAtTouchdownDeg}°</span>
          </div>
          <div className={STYLES.statBox}>
            <span className={STYLES.statLabel}>ความสบายขณะวิ่ง (Comfort)</span>
            <span className="text-lg font-extrabold text-emerald-600">{bio.perceivedComfortScore} / 10</span>
          </div>
          <div className={STYLES.statBox}>
            <span className={STYLES.statLabel}>คะแนนความมั่นคง (Stability)</span>
            <span className="text-lg font-extrabold text-blue-600">{bio.stabilityRating} / 10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
