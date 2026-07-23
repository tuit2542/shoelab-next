import { useState, useMemo, useEffect } from 'react';
import { Shoe, PhysicalMetrics, BiomechanicalMetrics } from '@/types';
import { initialShoeDatabase } from '@/data/shoes';
import * as XLSX from 'xlsx';

export type SortOption = 'default' | 'price_asc' | 'price_desc' | 'weight_asc' | 'weight_desc' | 'drop_asc' | 'drop_desc';

const parsePrice = (priceStr: string) => {
  if (!priceStr) return Infinity;
  const cleaned = priceStr.replace(/~/g, '').replace(/,/g, '').replace(/x/gi, '0');
  const num = parseInt(cleaned, 10);
  return isNaN(num) ? Infinity : num; 
};
const parseDrop = (dropStr: string) => parseFloat(dropStr || '0');

/**
 * คำนวณและวิเคราะห์ค่า Physical Metrics (คุณสมบัติทางกายภาพ) ของรองเท้าวิ่ง
 * 
 * ฟังก์ชันนี้ทำหน้าที่แปลงข้อมูลดิบ (raw data) จากตารางให้กลายเป็นค่าตัวเลขทางฟิสิกส์และวัสดุศาสตร์ของรองเท้า
 * หากไม่มีข้อมูลระบุมา จะมีการประเมินค่าตั้งต้น (Default fallback) โดยอ้างอิงจากตรรกะและมาตรฐานของอุตสาหกรรมรองเท้าวิ่งในปัจจุบัน:
 * - การประเมินโฟม (Superfoam): หากพบชื่อประเภทวัสดุอย่าง peba, tpee, supercritical, lightstrike pro ฯลฯ จะประเมินว่าเป็นโฟมประสิทธิภาพสูง ซึ่งจะถูกตั้งค่าความนุ่ม (Asker C) ให้ต่ำลง (นุ่มขึ้น) และมีค่า Energy Return ที่สูงขึ้น
 * - การประเมินแผ่นคาร์บอน (Carbon Plate): หากพบเทคโนโลยี carbon, plate, rod จะประเมินว่ามีแผ่นช่วยเด้ง ซึ่งจะเพิ่มค่า Bending Stiffness (ความแข็งต้านการงอ)
 * - ความแข็งที่เปลี่ยนไปตามอุณหภูมิ (Stiffening): ประเมินจากส่วนต่างความแข็ง Asker C ระหว่างอุณหภูมิห้องกับอุณหภูมิเย็น
 * 
 * แหล่งอ้างอิงหลักการ (อ้างอิงเชิงลอจิกในโค้ด):
 * ค่าต่างๆ อ้างอิงจากหลักการวัสดุศาสตร์ของพื้นรองเท้าวิ่ง (Footwear Materials Science) และคุณสมบัติของ Super Shoes ในปัจจุบัน
 * - อิทธิพลของโฟม PEBA และ Carbon Plate (Advanced Footwear Technology): 
 *   https://www.frontiersin.org/articles/10.3389/fspor.2023.1118118/full
 * - การทดสอบคุณสมบัติทางกายภาพของพื้นรองเท้า (Energy Return, Bending Stiffness): 
 *   https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8945645/
 *
 * @param row - ข้อมูลดิบของรองเท้าแต่ละคู่ที่อ่านได้จากไฟล์ (เช่น Excel) หรือฐานข้อมูล
 * @param stackStr - สตริงแสดงความหนาพื้นรองเท้า (เช่น '36/28')
 * @param weight - น้ำหนักของรองเท้า (กรัม)
 * @param dropStr - สตริงแสดงความชันหรือ Drop ของรองเท้า (มม.)
 * @param foamStr - ชื่อประเภทโฟมที่ใช้ในรองเท้า
 * @param techStr - ชื่อเทคโนโลยีที่ใช้ (เพื่อใช้ตรวจสอบหา Carbon Plate/Rods)
 * @returns ออบเจกต์ PhysicalMetrics ที่มีค่าคุณสมบัติทางกายภาพแบบตัวเลขครบถ้วน
 */
export function createPhysicalMetrics(row: any, stackStr: string, weight: number, dropStr: string, foamStr: string, techStr: string): PhysicalMetrics {
  const stackParts = (stackStr || '36/28').split('/').map(s => parseFloat(s.trim()));
  const heel = row.stack_heel_mm ? Number(row.stack_heel_mm) : (stackParts[0] || 36);
  const drop = row.stack_drop_mm ? Number(row.stack_drop_mm) : (parseFloat(dropStr) || 8);
  const forefoot = row.stack_forefoot_mm ? Number(row.stack_forefoot_mm) : (stackParts[1] || Math.max(10, heel - drop));

  const foamLower = String(foamStr).toLowerCase();
  const techLower = String(techStr).toLowerCase();
  const isSuperfoam = foamLower.includes('peba') || foamLower.includes('tpee') || foamLower.includes('supercritical') || foamLower.includes('lightstrike pro') || foamLower.includes('ff blast') || foamLower.includes('nitro');
  const hasCarbon = techLower.includes('carbon') || techLower.includes('rod') || techLower.includes('plate') || techLower.includes('shank');

  const softnessRoom = row.midsole_softness_room_asker_c ? Number(row.midsole_softness_room_asker_c) : (isSuperfoam ? 19.5 : 26.0);
  const softnessCold = row.midsole_softness_cold_asker_c ? Number(row.midsole_softness_cold_asker_c) : (isSuperfoam ? 21.5 : 31.5);
  const stiffening = row.hardness_stiffening_percent ? Number(row.hardness_stiffening_percent) : Math.round(((softnessCold - softnessRoom) / softnessRoom) * 1000) / 10;

  return {
    stackHeelMm: heel,
    stackForefootMm: forefoot,
    stackDropMm: drop,
    midsoleSoftnessRoomAskerC: softnessRoom,
    midsoleSoftnessColdAskerC: softnessCold,
    hardnessStiffeningPercent: stiffening,
    energyReturnPercent: row.energy_return_percent ? Number(row.energy_return_percent) : (isSuperfoam ? 85.5 : 76.0),
    shockAbsorptionPercent: row.shock_absorption_percent ? Number(row.shock_absorption_percent) : (heel > 38 ? 84.0 : 76.0),
    bendingStiffnessN: row.bending_stiffness_n ? Number(row.bending_stiffness_n) : (hasCarbon ? 44.0 : 22.0),
    platformForefootMm: row.platform_forefoot_mm ? Number(row.platform_forefoot_mm) : 114.0,
    platformHeelMm: row.platform_heel_mm ? Number(row.platform_heel_mm) : 86.0,
    insoleThicknessMm: row.insole_thickness_mm ? Number(row.insole_thickness_mm) : 4.0,
    tongueThicknessMm: row.tongue_thickness_mm ? Number(row.tongue_thickness_mm) : 3.0,
    breathabilityScore: row.breathability_score ? Number(row.breathability_score) : 8.5,
    tractionDryCoF: row.traction_dry_cof ? Number(row.traction_dry_cof) : 0.85,
    tractionWetCoF: row.traction_wet_cof ? Number(row.traction_wet_cof) : 0.78,
    durabilityScore: row.durability_score ? Number(row.durability_score) : 8.2,
    carbonPlateType: row.carbon_plate_type || (hasCarbon ? (techLower.includes('rod') ? 'rods' : 'full-length') : 'none'),
    rockerGeometry: row.rocker_geometry || (heel > 38 ? 'aggressive' : 'moderate')
  };
}

/**
 * คำนวณและวิเคราะห์ค่า Biomechanical Metrics (ชีวกลศาสตร์) ที่รองเท้ามีผลต่อผู้สวมใส่เมื่อใช้งาน
 * 
 * ฟังก์ชันนี้ทำหน้าที่ประเมินตัวแปรทางชีวกลศาสตร์ (แรงกระทำและมุมข้อต่อ) เมื่อเกิดการวิ่ง
 * โดยใช้หลักการทางชีวกลศาสตร์การวิ่ง (Running Biomechanics) มาเป็นเกณฑ์ตั้งค่า fallback หากไม่ระบุข้อมูล:
 * - แรงกระแทก (Peak GRF & Impact Loading Rate): อ้างอิงจากหลักการที่ว่า รองเท้าที่มีความหนาส้นสูง (Heel Stack > 38mm) มักจะช่วยกระจายและดูดซับแรงกระแทกได้ดีกว่า ทำให้ค่าแรงต้านจากพื้น (GRF) และอัตราการกระแทก (Loading Rate) ลดลง
 * - ความมั่นคง (Stability Rating): หากรองเท้ามีความหนาสูงมาก (Heel Stack > 40mm) จุดศูนย์ถ่วงที่สูงขึ้นจะส่งผลให้คะแนนความมั่นคงของรองเท้าลดลงโดยธรรมชาติ
 * 
 * แหล่งอ้างอิงหลักการ (อ้างอิงเชิงลอจิกในโค้ด):
 * ตัวแปรเหล่านี้สอดคล้องกับพารามิเตอร์ที่ใช้วัดในห้องปฏิบัติการชีวกลศาสตร์ (Biomechanics Lab) เพื่อวิเคราะห์ประสิทธิภาพและโอกาสเกิดการบาดเจ็บของนักวิ่ง
 * - ผลของความหนาพื้นรองเท้า (Stack Height) ต่อแรงกระแทก (GRF) และ Loading Rate: 
 *   https://www.nature.com/articles/s41598-020-71277-9
 * - การศึกษาด้านความมั่นคง (Stability) จากจุดศูนย์ถ่วงของรองเท้าส้นหนา: 
 *   https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9317924/
 *
 * @param row - ข้อมูลดิบของรองเท้าแต่ละคู่
 * @param weight - น้ำหนักของรองเท้า (กรัม)
 * @param heelStack - ความสูงของพื้นรองเท้าบริเวณส้น (Heel Stack Height) ซึ่งมีผลโดยตรงต่อการประเมินการดูดซับแรงกระแทกและความมั่นคง
 * @returns ออบเจกต์ BiomechanicalMetrics ที่มีค่าทางชีวกลศาสตร์สำหรับการนำไปวิเคราะห์ผลต่อร่างกาย
 */
export function createBiomechanicalMetrics(row: any, weight: number, heelStack: number): BiomechanicalMetrics {
  return {
    peakGRF_BW: row.peak_grf_bw ? Number(row.peak_grf_bw) : (heelStack > 38 ? 2.05 : 2.25),
    impactLoadingRate: row.impact_loading_rate ? Number(row.impact_loading_rate) : (heelStack > 38 ? 48.0 : 62.0),
    peakPlantarPressureKPa: row.peak_plantar_pressure_kpa ? Number(row.peak_plantar_pressure_kpa) : 210,
    pronationType: row.pronation_type || 'neutral',
    pronationAngleDeg: row.pronation_angle_deg ? Number(row.pronation_angle_deg) : -5.0,
    contactAreaCm2: row.contact_area_cm2 ? Number(row.contact_area_cm2) : 142,
    ankleFlexionAngleDeg: row.ankle_flexion_angle_deg ? Number(row.ankle_flexion_angle_deg) : 18.5,
    kneeFlexionAtTouchdownDeg: row.knee_flexion_at_touchdown_deg ? Number(row.knee_flexion_at_touchdown_deg) : 14.5,
    perceivedComfortScore: row.perceived_comfort_score ? Number(row.perceived_comfort_score) : 8.5,
    stabilityRating: row.stability_rating ? Number(row.stability_rating) : (heelStack > 40 ? 7.2 : 8.2)
  };
}

export function getSmartBuyUrl(shoe: { brand: string; name: string; buyUrl?: string }): string {
  if (shoe.buyUrl && (shoe.buyUrl.startsWith('http://') || shoe.buyUrl.startsWith('https://'))) {
    return shoe.buyUrl;
  }
  const query = encodeURIComponent(`${shoe.brand} ${shoe.name}`);
  const brandLower = shoe.brand.toLowerCase();
  if (brandLower.includes('adidas')) {
    return `https://www.adidas.co.th/th/search?q=${query}`;
  } else if (brandLower.includes('asics')) {
    return `https://www.asics.com/th/th-th/search?q=${query}`;
  } else if (brandLower.includes('puma')) {
    return `https://th.puma.com/th/th/search?q=${query}`;
  } else if (brandLower.includes('anta')) {
    return `https://www.google.com/search?q=ANTA+${query}+Thailand+Store`;
  }
  return `https://www.google.com/search?q=${query}`;
}

export function useShoes() {
  const [shoes, setShoes] = useState<Shoe[]>(initialShoeDatabase);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [goalFilter, setGoalFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  // Load from local storage on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shoelab_shoes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setShoes(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load shoes from local storage", e);
    }
  }, []);

  const brands = useMemo(() => ['all', ...Array.from(new Set(shoes.map(s => s.brand))).filter(Boolean).sort()], [shoes]);
  const goals = useMemo(() => ['all', ...Array.from(new Set(shoes.map(s => s.goal))).filter(Boolean).sort()], [shoes]);

  const filteredShoes = useMemo(() => {
    let result = shoes.filter(shoe => {
      const matchBrand = brandFilter === 'all' || shoe.brand === brandFilter;
      const matchGoal = goalFilter === 'all' || shoe.goal === goalFilter;
      const matchSearch = searchQuery === '' || 
        shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        shoe.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBrand && matchGoal && matchSearch;
    });

    if (sortOption !== 'default') {
      result.sort((a, b) => {
        if (sortOption === 'price_asc') return parsePrice(a.price) - parsePrice(b.price);
        if (sortOption === 'price_desc') return parsePrice(b.price) - parsePrice(a.price);
        if (sortOption === 'weight_asc') return a.weight - b.weight;
        if (sortOption === 'weight_desc') return b.weight - a.weight;
        if (sortOption === 'drop_asc') return parseDrop(a.drop) - parseDrop(b.drop);
        if (sortOption === 'drop_desc') return parseDrop(b.drop) - parseDrop(a.drop);
        return 0;
      });
    }

    return result;
  }, [shoes, brandFilter, goalFilter, sortOption, searchQuery]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = evt.target?.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];
        
        if (jsonData && jsonData.length > 0) {
          const newShoes: Shoe[] = jsonData.map((row, index) => {
            let parsedColor = String(row.color || '#94a3b8');
            try {
              if (row.hex_color) {
                const hexArr = JSON.parse(row.hex_color);
                if (Array.isArray(hexArr) && hexArr.length > 0) {
                  parsedColor = row.hex_color;
                }
              }
            } catch (err) {
              // Fallback to color
            }

            const weight = typeof row.weight === 'number' ? row.weight : parseFloat(String(row.weight || '0')) || 220;
            const stack = String(row.stack || '36/28');
            const drop = String(row.drop || '8');
            const foam = String(row.foam || '-');
            const tech = String(row.tech || '-');

            const phys = createPhysicalMetrics(row, stack, weight, drop, foam, tech);
            const bio = createBiomechanicalMetrics(row, weight, phys.stackHeelMm);

            const brand = String(row.brand || 'Unknown');
            const name = String(row.name || 'Unknown Shoe');
            const buyUrl = String(row.buy_url || row.buyUrl || '');

            return {
              id: String(row.id || `imported_${Date.now()}_${index}`),
              brand: brand,
              name: name,
              foam: foam,
              tech: tech,
              stack: stack,
              weight: weight,
              drop: drop,
              price: String(row.price || '-'),
              goal: String(row.goal || '-'),
              color: parsedColor,
              image: String(row.image || ''),
              buyUrl: buyUrl || getSmartBuyUrl({ brand, name }),
              storeName: String(row.store_name || `${brand} Official Store`),
              physicalMetrics: phys,
              biomechanicalMetrics: bio
            };
          });
          const combinedShoes = [...initialShoeDatabase, ...newShoes];
          setShoes(combinedShoes);
          try {
            localStorage.setItem('shoelab_shoes', JSON.stringify(combinedShoes));
          } catch (e) {
            console.error("Failed to save to local storage", e);
          }
          setBrandFilter('all');
          setGoalFilter('all');
          setSearchQuery('');
          setSortOption('default');
        }
      } catch (error) {
        console.error("Error parsing file", error);
        alert("ไม่สามารถอ่านไฟล์ได้ โปรดตรวจสอบรูปแบบไฟล์อีกครั้ง");
      }
      
      if (e.target) {
        e.target.value = '';
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        id: "new1",
        brand: "Adidas",
        name: "Adizero Sample Pro",
        foam: "Lightstrike Pro",
        tech: "EnergyRods (Carbon)",
        stack: "39/33",
        weight: 205,
        drop: "6",
        price: "8500",
        goal: "Marathon Race",
        color: "#ff7675",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
        buy_url: "https://www.adidas.co.th",
        store_name: "Adidas Official Store",
        stack_heel_mm: 39,
        stack_forefoot_mm: 33,
        stack_drop_mm: 6,
        midsole_softness_room_asker_c: 18.5,
        midsole_softness_cold_asker_c: 20.5,
        energy_return_percent: 87.5,
        shock_absorption_percent: 82.0,
        bending_stiffness_n: 48.0,
        traction_dry_cof: 0.88,
        traction_wet_cof: 0.82,
        peak_grf_bw: 2.15,
        impact_loading_rate: 55.0,
        stability_rating: 7.8
      }
    ];
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Shoes");
    XLSX.writeFile(wb, "shoelab_full_template.xlsx");
  };

  return {
    shoes,
    filteredShoes,
    brands,
    goals,
    searchQuery,
    setSearchQuery,
    brandFilter,
    setBrandFilter,
    goalFilter,
    setGoalFilter,
    sortOption,
    setSortOption,
    handleFileUpload,
    downloadTemplate
  };
}

