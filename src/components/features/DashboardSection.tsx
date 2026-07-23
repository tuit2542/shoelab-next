'use client';
import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, ChartTooltip, Legend);

const styles = {
  section: "mb-16 scroll-mt-20",
  header: {
    container: "bg-white dark:bg-slate-800/90 rounded-3xl p-8 shadow-sm border border-orange-100 dark:border-slate-700/60 mb-8 transition-colors",
    title: "text-3xl font-bold mb-4 leading-tight text-gray-900 dark:text-slate-100",
    desc: "text-gray-600 dark:text-slate-300 leading-relaxed max-w-3xl",
  },
  grid: "grid grid-cols-1 md:grid-cols-3 gap-8 items-center",
  chartCard: {
    container: "md:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200/80 dark:border-slate-700/60 rounded-2xl p-6 shadow-sm transition-colors",
    title: "font-semibold mb-4 text-center text-gray-900 dark:text-slate-100",
    wrapper: "relative w-full mx-auto h-[350px] max-w-[650px]",
    footer: "text-xs text-gray-400 dark:text-slate-400 mt-4 text-center",
  },
  trendCard: {
    container: "bg-slate-900 dark:bg-slate-950 text-white rounded-2xl p-6 flex flex-col justify-center h-full border border-slate-800",
    title: "text-xl font-bold mb-4 text-orange-400",
    list: "space-y-4",
    item: "flex items-start",
    itemNumber: "mr-2 text-orange-400 font-bold",
    itemText: "text-sm text-slate-200",
  }
};
interface DashboardProps {
  scatterData: { x: number; y: number; label: string }[];
}

export function DashboardSection({ scatterData }: Readonly<DashboardProps>) {
  const chartData = {
    datasets: [{
      label: 'Running Shoes 2026',
      data: scatterData,
      backgroundColor: '#e17055',
      pointRadius: 6,
      pointHoverRadius: 8
    }]
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'น้ำหนัก (กรัม)' }, reverse: true, grid: { color: 'rgba(148, 163, 184, 0.15)' } },
      y: { title: { display: true, text: 'ความหนาส้นเท้า (มม.)' }, grid: { color: 'rgba(148, 163, 184, 0.15)' } }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.raw.label}: ${ctx.raw.x}g / ${ctx.raw.y}mm`
        }
      }
    }
  };


  return (
    <section id="dashboard" className={styles.section}>
      <div className={styles.header.container}>
        <h1 className={styles.header.title}>วิวัฒนาการรองเท้าวิ่ง: จากทฤษฎีสู่การลงสนามจริง</h1>
        <p className={styles.header.desc}>
          ยินดีต้อนรับสู่ศูนย์กลางข้อมูลรองเท้าวิ่งที่รวบรวมข้อมูลจากรายงานวิจัยล่าสุด เราจะพาคุณไปสำรวจเทคโนโลยี <strong>Supercritical Foams</strong> และโครงสร้าง <strong>Rocker Geometry</strong> ที่ช่วยเปลี่ยนการวิ่งของคุณให้เป็นเรื่องง่ายขึ้น ไม่ว่าคุณจะเล็งเป้าหมายที่การทำลายสถิติ (PB) หรือต้องการความนุ่มนวลในการซ้อมประจำวัน
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.chartCard.container}>
          <h3 className={styles.chartCard.title}>แผนผังสมรรถนะ: น้ำหนัก (กรัม) vs. ความหนาของพื้น (มม.)</h3>
          <div className={styles.chartCard.wrapper}>
            <Scatter data={chartData} options={chartOptions} />
          </div>
          <p className={styles.chartCard.footer}>* จุดที่อยู่มุมซ้ายบนคือรองเท้าที่ "เบาแต่หนา" ซึ่งแสดงถึงเทคโนโลยีโฟมระดับสูงสุด</p>
        </div>
        <div className={styles.trendCard.container}>
          <h3 className={styles.trendCard.title}>เทรนด์โลกปี 2026</h3>
          <ul className={styles.trendCard.list}>
            <li className={styles.trendCard.item}>
              <span className={styles.trendCard.itemNumber}>01</span>
              <span className={styles.trendCard.itemText}>การเข้าถึงโฟมระดับแข่งขันในราคาย่อมเยา (Democratization)</span>
            </li>
            <li className={styles.trendCard.item}>
              <span className={styles.trendCard.itemNumber}>02</span>
              <span className={styles.trendCard.itemText}>การลดบทบาทแผ่นคาร์บอนในการซ้อมเพื่อถนอมเส้นเอ็น</span>
            </li>
            <li className={styles.trendCard.item}>
              <span className={styles.trendCard.itemNumber}>03</span>
              <span className={styles.trendCard.itemText}>การรุกหนักของแบรนด์เอเชียด้วยเทคโนโลยีเคมีขั้นสูง</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
