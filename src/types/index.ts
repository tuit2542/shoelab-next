export interface PhysicalMetrics {
  stackHeelMm: number;
  stackForefootMm: number;
  stackDropMm: number;
  midsoleSoftnessRoomAskerC: number; // e.g. 15-40 Asker C (lower = softer)
  midsoleSoftnessColdAskerC: number; // e.g. after freezing
  hardnessStiffeningPercent: number; // % increase in hardness when frozen
  energyReturnPercent: number; // e.g. 85.4%
  shockAbsorptionPercent: number; // e.g. 78%
  bendingStiffnessN: number; // Newton force to bend 45 deg
  platformForefootMm: number; // forefoot width in mm
  platformHeelMm: number; // heel width in mm
  insoleThicknessMm: number;
  tongueThicknessMm: number;
  breathabilityScore: number; // 1-10 (10 = highest airflow)
  tractionDryCoF: number; // Coefficient of friction (e.g. 0.85)
  tractionWetCoF: number; // Coefficient of friction (e.g. 0.72)
  durabilityScore: number; // 1-10
  carbonPlateType: 'none' | 'full-length' | 'rods' | 'dual-plate' | 'shank';
  rockerGeometry: 'low' | 'moderate' | 'aggressive';
}

export interface BiomechanicalMetrics {
  peakGRF_BW: number; // Ground Reaction Force in Body Weight (e.g. 2.15 BW)
  impactLoadingRate: number; // BW/s (e.g. 52.4 BW/s)
  peakPlantarPressureKPa: number; // kPa (e.g. 240 kPa)
  pronationType: 'heavy-overpronation' | 'mild-overpronation' | 'neutral' | 'supination';
  pronationAngleDeg: number; // e.g. -7.5 deg
  contactAreaCm2: number; // cm²
  ankleFlexionAngleDeg: number;
  kneeFlexionAtTouchdownDeg: number;
  perceivedComfortScore: number; // 1-10
  stabilityRating: number; // 1-10
}

export interface Shoe {
  id: string;
  brand: string;
  name: string;
  foam: string;
  tech: string;
  stack: string;
  weight: number;
  drop: string;
  price: string;
  goal: string;
  color: string;
  image?: string;
  buyUrl?: string;
  storeName?: string;
  physicalMetrics?: PhysicalMetrics;
  biomechanicalMetrics?: BiomechanicalMetrics;
}


