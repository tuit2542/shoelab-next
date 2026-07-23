import React from 'react';
import { Shoe } from '@/types';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { Tooltip } from '../../shared/Tooltip';
import { ShoeVisualRender } from '../../shared/ShoeVisualRender';
import { getSmartBuyUrl } from '@/hooks/useShoes';
import { STYLES } from './styles';
import { parsePrice, parseStack, parseWeight } from './utils';

interface ComparisonTableProps {
  selectedShoes: Shoe[];
}

export function ComparisonTable({ selectedShoes }: Readonly<ComparisonTableProps>) {
  let minPrice = Infinity, maxPrice = -Infinity;
  let minStack = Infinity, maxStack = -Infinity;
  let minWeight = Infinity, maxWeight = -Infinity;

  selectedShoes.forEach(shoe => {
    const price = parsePrice(shoe.price);
    const stack = parseStack(shoe.stack);
    const weight = parseWeight(shoe.weight);

    if (price < minPrice) minPrice = price;
    if (price !== Infinity && price > maxPrice) maxPrice = price;

    if (stack < minStack) minStack = stack;
    if (stack > maxStack) maxStack = stack;

    if (weight < minWeight) minWeight = weight;
    if (weight > maxWeight) maxWeight = weight;
  });

  const canCompare = selectedShoes.length > 1;

  const getOriginalValue = (shoe: Shoe, type: 'price' | 'stack' | 'weight') => {
    if (type === 'price') return <span className={STYLES.values.originalPrice}>{shoe.price}</span>;
    if (type === 'stack') return `${shoe.stack} มม.`;
    if (type === 'weight') return `${shoe.weight} กรัม`;
  };

  const renderValue = (shoe: Shoe, type: 'price' | 'stack' | 'weight') => {
    if (!canCompare) return getOriginalValue(shoe, type);

    const valPrice = parsePrice(shoe.price);
    const valStack = parseStack(shoe.stack);
    const valWeight = parseWeight(shoe.weight);

    if (type === 'price') {
      if (valPrice === minPrice && minPrice !== maxPrice) return <span className={`${STYLES.values.emeraldText} ${STYLES.values.base}`}>{shoe.price} <span className={`${STYLES.values.badge} ${STYLES.values.emeraldBadge}`}>ถูกสุด</span></span>;
      if (valPrice === maxPrice && minPrice !== maxPrice) return <span className={`${STYLES.values.roseText} ${STYLES.values.base}`}>{shoe.price} <span className={`${STYLES.values.badge} ${STYLES.values.roseBadge}`}>แพงสุด</span></span>;
    }
    if (type === 'stack') {
      if (valStack === maxStack && minStack !== maxStack) return <span className={`${STYLES.values.indigoText} ${STYLES.values.base}`}>{shoe.stack} มม. <span className={`${STYLES.values.badge} ${STYLES.values.indigoBadge}`}>หนาสุด</span></span>;
      if (valStack === minStack && minStack !== maxStack) return <span className={`${STYLES.values.amberText} ${STYLES.values.base}`}>{shoe.stack} มม. <span className={`${STYLES.values.badge} ${STYLES.values.amberBadge}`}>บางสุด</span></span>;
    }
    if (type === 'weight') {
      if (valWeight === minWeight && minWeight !== maxWeight) return <span className={`${STYLES.values.emeraldText} ${STYLES.values.base}`}>{shoe.weight} กรัม <span className={`${STYLES.values.badge} ${STYLES.values.emeraldBadge}`}>เบาสุด</span></span>;
      if (valWeight === maxWeight && minWeight !== maxWeight) return <span className={`${STYLES.values.roseText} ${STYLES.values.base}`}>{shoe.weight} กรัม <span className={`${STYLES.values.badge} ${STYLES.values.roseBadge}`}>หนักสุด</span></span>;
    }

    return getOriginalValue(shoe, type);
  };

  const getCellBg = (shoe: Shoe, type: 'price' | 'stack' | 'weight') => {
    if (!canCompare) return STYLES.cellBg.default;
    
    const valPrice = parsePrice(shoe.price);
    const valStack = parseStack(shoe.stack);
    const valWeight = parseWeight(shoe.weight);
    
    let bg = STYLES.cellBg.default;
    if (type === 'price') {
      if (valPrice === minPrice && minPrice !== maxPrice) bg = STYLES.cellBg.emerald;
      if (valPrice === maxPrice && minPrice !== maxPrice) bg = STYLES.cellBg.rose;
    } else if (type === 'stack') {
      if (valStack === maxStack && minStack !== maxStack) bg = STYLES.cellBg.indigo;
      if (valStack === minStack && minStack !== maxStack) bg = STYLES.cellBg.amber;
    } else if (type === 'weight') {
      if (valWeight === minWeight && minWeight !== maxWeight) bg = STYLES.cellBg.emerald;
      if (valWeight === maxWeight && minWeight !== maxWeight) bg = STYLES.cellBg.rose;
    }
    return bg;
  };

  return (
    <div className={STYLES.table.container}>
      <table className={STYLES.table.element}>
        <thead>
          <tr>
            <th className={STYLES.table.thBase}>ข้อมูลจำเพาะ</th>
            {selectedShoes.map(shoe => (
              <th key={shoe.id} className={STYLES.table.thItem}>
                <div className="w-full h-20 mb-2 rounded-xl bg-white dark:bg-slate-900 p-1 flex items-center justify-center border border-slate-200/60 dark:border-slate-800">
                  <ShoeVisualRender shoe={shoe} className="h-full w-full" />
                </div>
                <div className={STYLES.table.thItemBrand}>{shoe.brand}</div>
                <div className={STYLES.table.thItemName}>{shoe.name}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={STYLES.table.tbody}>
          <tr className={STYLES.table.tr}>
            <td className={STYLES.table.tdLabel}><Tooltip label="โฟม (Foam)" hintKey="foam" /></td>
            {selectedShoes.map(shoe => <td key={shoe.id} className={STYLES.table.tdValue}>{shoe.foam}</td>)}
          </tr>
          <tr className={STYLES.table.tr}>
            <td className={STYLES.table.tdLabel}><Tooltip label="เทคโนโลยี" hintKey="tech" /></td>
            {selectedShoes.map(shoe => <td key={shoe.id} className={STYLES.table.tdValue}>{shoe.tech}</td>)}
          </tr>
          <tr className={STYLES.table.tr}>
            <td className={STYLES.table.tdLabel}><Tooltip label="ความหนา (Stack)" hintKey="stack" /></td>
            {selectedShoes.map(shoe => <td key={shoe.id} className={getCellBg(shoe, 'stack')}>{renderValue(shoe, 'stack')}</td>)}
          </tr>
          <tr className={STYLES.table.tr}>
            <td className={STYLES.table.tdLabel}><Tooltip label="น้ำหนัก" hintKey="weight" /></td>
            {selectedShoes.map(shoe => <td key={shoe.id} className={getCellBg(shoe, 'weight')}>{renderValue(shoe, 'weight')}</td>)}
          </tr>
          <tr className={STYLES.table.tr}>
            <td className={STYLES.table.tdLabel}><Tooltip label="ดรอป" hintKey="drop" /></td>
            {selectedShoes.map(shoe => <td key={shoe.id} className={STYLES.table.tdValue}>{shoe.drop} มม.</td>)}
          </tr>
          <tr className={STYLES.table.tr}>
            <td className={STYLES.table.tdLabel}><Tooltip label="เป้าหมายหลัก" hintKey="goal" /></td>
            {selectedShoes.map(shoe => <td key={shoe.id} className={STYLES.table.tdValue}>{shoe.goal}</td>)}
          </tr>

          {/* SHOELAB PHYSICAL METRICS */}
          <tr className="bg-orange-50/70 dark:bg-orange-950/40 text-orange-950 dark:text-orange-300 font-bold border-y border-orange-200 dark:border-orange-900/40 text-xs">
            <td colSpan={selectedShoes.length + 1} className="p-2 tracking-wider uppercase">
              🧪 ผลทดสอบทางกายภาพและวัสดุ (Shoelab Physical Tests)
            </td>
          </tr>
          <tr className={STYLES.table.tr}>
            <td className={STYLES.table.tdLabel}>พลังงานคืนกลับ (Energy Return)</td>
            {selectedShoes.map(shoe => (
              <td key={shoe.id} className={STYLES.table.tdValue}>
                {shoe.physicalMetrics ? (
                  <span className="font-extrabold text-orange-600 dark:text-orange-400">
                    {shoe.physicalMetrics.energyReturnPercent}%
                  </span>
                ) : '-'}
              </td>
            ))}
          </tr>
          <tr className={STYLES.table.tr}>
            <td className={STYLES.table.tdLabel}>ความนุ่มโฟม (Asker C / แช่เย็น)</td>
            {selectedShoes.map(shoe => (
              <td key={shoe.id} className={STYLES.table.tdValue}>
                {shoe.physicalMetrics ? (
                  <div className="text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{shoe.physicalMetrics.midsoleSoftnessRoomAskerC} C</span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 block">+{shoe.physicalMetrics.hardnessStiffeningPercent}% โคลด์</span>
                  </div>
                ) : '-'}
              </td>
            ))}
          </tr>
          <tr className={STYLES.table.tr}>
            <td className={STYLES.table.tdLabel}>แรงต้านการงอ (Stiffness)</td>
            {selectedShoes.map(shoe => (
              <td key={shoe.id} className={STYLES.table.tdValue}>
                {shoe.physicalMetrics ? `${shoe.physicalMetrics.bendingStiffnessN} N` : '-'}
              </td>
            ))}
          </tr>

          {/* SHOELAB BIOMECHANICAL METRICS */}
          <tr className="bg-purple-50/70 dark:bg-purple-950/40 text-purple-950 dark:text-purple-300 font-bold border-y border-purple-200 dark:border-purple-900/40 text-xs">
            <td colSpan={selectedShoes.length + 1} className="p-2 tracking-wider uppercase">
              🏃 ผลทดสอบทางชีวกลศาสตร์ (Biomechanical Tests)
            </td>
          </tr>
          <tr className={STYLES.table.tr}>
            <td className={STYLES.table.tdLabel}>Ground Reaction Force (Peak GRF)</td>
            {selectedShoes.map(shoe => (
              <td key={shoe.id} className={STYLES.table.tdValue}>
                {shoe.biomechanicalMetrics ? (
                  <span className="font-bold text-slate-800 dark:text-slate-200">{shoe.biomechanicalMetrics.peakGRF_BW} BW</span>
                ) : '-'}
              </td>
            ))}
          </tr>
          <tr className={STYLES.table.tr}>
            <td className={STYLES.table.tdLabel}>คะแนนความมั่นคง (Stability Rating)</td>
            {selectedShoes.map(shoe => (
              <td key={shoe.id} className={STYLES.table.tdValue}>
                {shoe.biomechanicalMetrics ? (
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{shoe.biomechanicalMetrics.stabilityRating} / 10</span>
                ) : '-'}
              </td>
            ))}
          </tr>
          <tr className={STYLES.table.tr}>
            <td className={STYLES.table.tdLabel}><Tooltip label="ราคาประเมิน" hintKey="price" /></td>
            {selectedShoes.map(shoe => <td key={shoe.id} className={getCellBg(shoe, 'price') + ' text-lg'}>{renderValue(shoe, 'price')}</td>)}
          </tr>
          {/* STORE BUY ACTION ROW */}
          <tr className="bg-gradient-to-r from-orange-50/80 to-amber-50/80 dark:from-slate-900 dark:to-slate-850 border-t-2 border-orange-300 dark:border-orange-500/40">
            <td className={STYLES.table.tdLabelLast}>สั่งซื้อสินค้า (Buy Store)</td>
            {selectedShoes.map(shoe => (
              <td key={shoe.id} className="p-3 border-b border-gray-100 dark:border-slate-800">
                <a
                  href={getSmartBuyUrl(shoe)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <ShoppingBag size={14} />
                  <span>สั่งซื้อ</span>
                  <ExternalLink size={12} className="opacity-80" />
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
