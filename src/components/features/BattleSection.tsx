'use client';
import React, { useState, useEffect } from 'react';
import { Shoe } from '@/types';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

const styles = {
  section: "mb-16 bg-stone-50 dark:bg-slate-900/80 rounded-3xl p-8 border border-stone-200 dark:border-slate-800 scroll-mt-20 transition-colors",
  headerContainer: "text-center mb-10",
  title: "text-2xl font-bold mb-2 text-gray-900 dark:text-slate-100",
  subtitle: "text-gray-600 dark:text-slate-400 italic",
  selectContainer: "flex flex-col md:flex-row justify-center items-center gap-4 mb-8",
  vsText: "text-2xl font-black text-gray-400 italic",
  selectInput: "w-full md:w-64 text-sm font-bold border border-gray-300 dark:border-slate-600 rounded-xl p-3 bg-white dark:bg-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all cursor-pointer shadow-sm",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center",
  descContainer: "space-y-6 text-gray-800 dark:text-slate-200",
  card: "bg-white dark:bg-slate-800/90 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700/60 transition-colors",
  cardTitle: "text-lg font-bold mb-4 text-center text-gray-900 dark:text-slate-100",
  chartContainer: "relative w-full mx-auto h-[350px] max-w-[650px]",
  desc: {
    paragraph: "mb-4 text-gray-700 dark:text-slate-300",
    winnerBoxOrange: "bg-orange-50 dark:bg-orange-950/40 p-4 rounded-xl border border-orange-100 dark:border-orange-900/50 mt-6",
    winnerTitleOrange: "text-orange-600 dark:text-orange-400 block mb-1",
    winnerBoxStone: "bg-stone-100 dark:bg-slate-800 p-4 rounded-xl border border-stone-200 dark:border-slate-700 mt-6",
    winnerTitleStone: "text-stone-700 dark:text-slate-300 block mb-1",
    winnerText: "text-sm text-gray-700 dark:text-slate-300",
  }
};

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ChartTooltip,
  Legend
);

interface BattleSectionProps {
  shoes?: Shoe[];
}

export function BattleSection({ shoes = [] }: Readonly<BattleSectionProps>) {
  const [shoeAId, setShoeAId] = useState<string>('');
  const [shoeBId, setShoeBId] = useState<string>('');

  useEffect(() => {
    if (shoes.length >= 2 && !shoeAId && !shoeBId) {
      setShoeAId(shoes[0].id);
      setShoeBId(shoes[1].id);
    }
  }, [shoes, shoeAId, shoeBId]);

  if (!shoes || shoes.length < 2) return null;

  const shoeA = shoes.find(s => s.id === shoeAId) || shoes[0];
  const shoeB = shoes.find(s => s.id === shoeBId) || shoes[1];

  const getStats = (shoe: Shoe) => {
    const phys = shoe.physicalMetrics;
    const bio = shoe.biomechanicalMetrics;
    const speed = Math.min(100, (phys?.energyReturnPercent || 70) * 1.12);
    const cushion = Math.min(100, Math.max(50, (50 - (phys?.midsoleSoftnessRoomAskerC || 25)) * 2.5 + 40));
    const stability = Math.min(100, (bio?.stabilityRating || 7) * 10);
    
    let priceNum = 5000;
    if (shoe.price) {
      const p = parseInt(shoe.price.replace(/,/g, ''), 10);
      if (!isNaN(p) && p > 0) priceNum = p;
    }
    const value = Math.min(100, Math.max(50, 100 - ((priceNum - 3000) / 100)));
    const durability = Math.min(100, (phys?.durabilityScore || 8) * 10);

    return [Math.round(speed), Math.round(cushion), Math.round(stability), Math.round(value), Math.round(durability)];
  };

  const statsA = getStats(shoeA);
  const statsB = getStats(shoeB);

  const getWinnerDesc = () => {
    let winA = 0;
    let winB = 0;
    statsA.forEach((val, i) => {
      if (val > statsB[i]) winA++;
      else if (val < statsB[i]) winB++;
    });

    const isAWinner = winA > winB;
    const isTie = winA === winB;
    const winnerShoe = isAWinner ? shoeA : shoeB;
    const loserShoe = isAWinner ? shoeB : shoeA;

    return (
      <div className={isAWinner ? styles.desc.winnerBoxOrange : styles.desc.winnerBoxStone}>
        <strong className={isAWinner ? styles.desc.winnerTitleOrange : styles.desc.winnerTitleStone}>💡 ผลลัพธ์ภาพรวม:</strong>
        <p className={styles.desc.winnerText}>
          {isTie ? "สูสีมาก! ทั้งคู่มีข้อดีที่แตกต่างกันไป" : `${winnerShoe.name} เฉือนชนะ ${loserShoe.name} ไปด้วยสเปคที่โดดเด่นกว่าในหลายมิติ!`}
        </p>
      </div>
    );
  };

  const parseColor = (colorStr: string, defaultColor: string) => {
    if (!colorStr?.startsWith('#')) return defaultColor;
    return colorStr;
  };

  const colorA = parseColor(shoeA.color, '#fab1a0');
  const colorB = parseColor(shoeB.color, '#3498db');

  const chartData = {
    labels: ['ความเร็ว (Speed)', 'ความนุ่ม (Cushion)', 'ความมั่นคง (Stability)', 'ความคุ้มค่า (Value)', 'ความทนทาน (Durability)'],
    datasets: [
      { 
        label: shoeA.name, 
        data: statsA, 
        backgroundColor: `${colorA}33`, 
        borderColor: colorA, 
        pointBackgroundColor: colorA 
      },
      { 
        label: shoeB.name, 
        data: statsB, 
        backgroundColor: `${colorB}33`, 
        borderColor: colorB, 
        pointBackgroundColor: colorB 
      }
    ]
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    elements: {
      line: { borderWidth: 3 },
      point: { radius: 4, hoverRadius: 6 }
    },
    scales: {
      r: { 
        beginAtZero: true, 
        max: 100, 
        ticks: { display: false },
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        pointLabels: {
          font: { family: "'Kanit', sans-serif", size: 13, weight: 500 as const },
          color: '#4a4a4a'
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: { family: "'Kanit', sans-serif", size: 14 },
          usePointStyle: true
        }
      }
    }
  };

  return (
    <section id="battle" className={styles.section}>
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>เปรียบเทียบมวยคู่เอก (Dynamic Head-to-Head)</h2>
        <p className={styles.subtitle}>เลือกรองเท้า 2 รุ่นจากตารางของคุณ เพื่อดูการวิเคราะห์เปรียบเทียบในมิติต่างๆ แบบสดๆ</p>
      </div>

      <div className={styles.selectContainer}>
        <select 
          className={styles.selectInput}
          value={shoeAId}
          onChange={(e) => setShoeAId(e.target.value)}
        >
          {shoes.map(s => (
            <option key={s.id} value={s.id}>{s.brand} {s.name}</option>
          ))}
        </select>
        <span className={styles.vsText}>VS</span>
        <select 
          className={styles.selectInput}
          value={shoeBId}
          onChange={(e) => setShoeBId(e.target.value)}
        >
          {shoes.map(s => (
            <option key={s.id} value={s.id}>{s.brand} {s.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.grid}>
        <div className={styles.descContainer}>
          <p className={styles.desc.paragraph}>
            <strong>{shoeA.name}:</strong> โดดเด่นด้าน 
            {statsA[0] >= statsB[0] ? ' การทำความเร็ว ' : ' '}
            {statsA[1] >= statsB[1] ? ' ความนุ่มสบาย ' : ' '}
            {statsA[2] >= statsB[2] ? ' ความมั่นคง ' : ' '}
            น้ำหนัก {shoeA.weight} กรัม
          </p>
          <p className={styles.desc.paragraph}>
            <strong>{shoeB.name}:</strong> โดดเด่นด้าน
            {statsB[0] > statsA[0] ? ' การทำความเร็ว ' : ' '}
            {statsB[1] > statsA[1] ? ' ความนุ่มสบาย ' : ' '}
            {statsB[2] > statsA[2] ? ' ความมั่นคง ' : ' '}
            น้ำหนัก {shoeB.weight} กรัม
          </p>
          {getWinnerDesc()}
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>{shoeA.name} vs {shoeB.name}</h3>
          <div className={styles.chartContainer}>
            <Radar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </section>
  );
}
