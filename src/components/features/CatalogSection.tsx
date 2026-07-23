'use client';
import React from 'react';
import { useShoes } from '@/hooks/useShoes';
import { ShoeCard } from './ShoeCard';
import { Download, Upload } from 'lucide-react';
import { Shoe } from '@/types';


const styles = {
  section: "mb-16 scroll-mt-20",
  header: {
    container: "mb-8 flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4",
    title: "text-2xl font-bold mb-2 text-gray-900 dark:text-slate-100",
    subtitle: "text-gray-600 dark:text-slate-400",
    checkboxPreview: "inline-block w-4 h-4 border-2 border-gray-300 dark:border-slate-600 rounded mx-1 bg-white dark:bg-slate-700 align-middle",
    actionsContainer: "flex flex-col items-end space-y-2",
    actionsRow: "flex space-x-2",
    btnTemplate: "px-4 py-2 text-sm bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-200 rounded-xl transition font-medium border border-stone-300 dark:border-slate-700 flex items-center",
    btnTemplateIcon: "h-4 w-4 mr-2",
    btnUpload: "cursor-pointer px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition font-medium shadow-sm flex items-center",
    btnUploadIcon: "h-4 w-4 mr-2",
    fileInput: "hidden",
  },
  filter: {
    container: "flex flex-wrap gap-4 mb-6 p-5 bg-white dark:bg-slate-800/90 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/60 transition-colors",
    item: "flex-1 min-w-[160px]",
    label: "block text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 uppercase tracking-wider",
    select: "w-full text-sm border border-gray-200 dark:border-slate-700 rounded-xl p-2.5 bg-gray-50 dark:bg-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all cursor-pointer",
    input: "w-full text-sm border border-gray-200 dark:border-slate-700 rounded-xl p-2.5 bg-gray-50 dark:bg-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder-gray-400",
  },
  resultsCount: {
    container: "flex items-center mb-4 px-2",
    text: "text-sm text-gray-500 dark:text-slate-400 font-medium",
    badge: "inline-block bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 py-0.5 px-2.5 rounded-full text-xs font-bold mx-1 border border-orange-200 dark:border-orange-800/40",
  },
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
  empty: {
    container: "col-span-full flex flex-col items-center justify-center py-16 text-gray-400 dark:text-slate-500 bg-white dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-700 border-dashed",
    icon: "h-12 w-12 mb-4 text-gray-300 dark:text-slate-600",
  }
};

interface CatalogSectionProps {
  shoesData: ReturnType<typeof useShoes>;
  selectedIds: string[];
  onToggleShoe: (id: string) => void;
  onOpenLabReport?: (shoe: Shoe) => void;
}

export function CatalogSection({ shoesData, selectedIds, onToggleShoe, onOpenLabReport }: Readonly<CatalogSectionProps>) {
  const {
    filteredShoes,
    brands,
    goals,
    brandFilter,
    setBrandFilter,
    goalFilter,
    setGoalFilter,
    sortOption,
    setSortOption,
    searchQuery,
    setSearchQuery,
    handleFileUpload,
    downloadTemplate
  } = shoesData;

  return (
    <section id="catalog" className={styles.section}>
      <div className={styles.header.container}>
        <div>
          <h2 className={styles.header.title}>แคตตาล็อกรองเท้าวิ่ง (Adizero & ตัวเลือกอื่น)</h2>
          <p className={styles.header.subtitle}>เลือก <span className={styles.header.checkboxPreview}></span> ที่มุมขวาบนของการ์ด เพื่อนำไปเปรียบเทียบสเปคอย่างละเอียด (เลือกได้สูงสุด 4 รุ่น)</p>
        </div>
        
        <div className={styles.header.actionsContainer}>
          <div className={styles.header.actionsRow}>
            <button onClick={downloadTemplate} className={styles.header.btnTemplate}>
              <Download className={styles.header.btnTemplateIcon} />
              เทมเพลต
            </button>
            <label htmlFor="dataUpload" className={styles.header.btnUpload}>
              <Upload className={styles.header.btnUploadIcon} />
              นำเข้าข้อมูล (.xlsx, .csv)
            </label>
            <input type="file" id="dataUpload" accept=".csv, .xlsx" className={styles.header.fileInput} onChange={handleFileUpload} />
          </div>
        </div>
      </div>

      <div className={styles.filter.container}>
        <div className={styles.filter.item}>
          <div className={styles.filter.label}>ค้นหารุ่น / แบรนด์</div>
          <input 
            type="search" 
            placeholder="เช่น Adizero, ZoomX, Novablast..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.filter.input}
          />
        </div>
        <div className={styles.filter.item}>
          <div className={styles.filter.label}>จัดเรียงตาม</div>
          <select 
            value={sortOption} 
            onChange={e => setSortOption(e.target.value as any)} 
            className={styles.filter.select}
          >
            <option value="default">ค่าเริ่มต้น</option>
            <option value="price_asc">ราคา (ต่ำ-สูง)</option>
            <option value="price_desc">ราคา (สูง-ต่ำ)</option>
            <option value="weight_asc">น้ำหนัก (เบา-หนัก)</option>
            <option value="weight_desc">น้ำหนัก (หนัก-เบา)</option>
            <option value="drop_asc">ดรอป (ต่ำ-สูง)</option>
            <option value="drop_desc">ดรอป (สูง-ต่ำ)</option>
          </select>
        </div>
        <div className={styles.filter.item}>
          <div className={styles.filter.label}>แบรนด์</div>
          <select 
            value={brandFilter} 
            onChange={e => setBrandFilter(e.target.value)} 
            className={styles.filter.select}
          >
            {brands.map(b => <option key={b} value={b}>{b === 'all' ? 'ทั้งหมด' : b}</option>)}
          </select>
        </div>
        <div className={styles.filter.item}>
          <div className={styles.filter.label}>จุดประสงค์</div>
          <select 
            value={goalFilter} 
            onChange={e => setGoalFilter(e.target.value)} 
            className={styles.filter.select}
          >
            {goals.map(g => <option key={g} value={g}>{g === 'all' ? 'ทั้งหมด' : g}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.resultsCount.container}>
        <div className={styles.resultsCount.text}>
          พบรองเท้าทั้งหมด <span className={styles.resultsCount.badge}>{filteredShoes.length}</span> รุ่น
        </div>
      </div>

      <div className={styles.grid}>
        {filteredShoes.length > 0 ? (
          filteredShoes.map(shoe => (
            <ShoeCard 
              key={shoe.id} 
              shoe={shoe} 
              isSelected={selectedIds.includes(shoe.id)}
              onToggle={onToggleShoe} 
              onOpenLabReport={onOpenLabReport}
            />
          ))
        ) : (
          <div className={styles.empty.container}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.empty.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p>ไม่พบรองเท้าที่ตรงกับเงื่อนไขที่คุณค้นหา</p>
          </div>
        )}
      </div>
    </section>
  );
}

