import React from 'react';

const styles = {
  section: "mb-16 scroll-mt-20",
  headerContainer: "mb-8",
  title: "text-2xl font-bold mb-2 text-gray-900 dark:text-slate-100",
  subtitle: "text-gray-600 dark:text-slate-400",
  grid: "grid grid-cols-1 md:grid-cols-3 gap-6",
  card: {
    base: "bg-white dark:bg-slate-800/90 p-6 rounded-2xl shadow-sm transition-all hover:shadow-md dark:border-x dark:border-b dark:border-slate-700/60",
    borderBlue: "border-t-4 border-blue-500",
    borderRed: "border-t-4 border-red-500",
    borderGray: "border-t-4 border-gray-800 dark:border-slate-400",
    header: "flex justify-between items-start mb-4",
    badgeBlue: "text-xs font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest",
    badgeRed: "text-xs font-bold text-red-500 dark:text-red-400 uppercase tracking-widest",
    badgeGray: "text-xs font-bold text-gray-800 dark:text-slate-300 uppercase tracking-widest",
    price: "font-bold text-slate-800 dark:text-slate-200",
    name: "text-xl font-bold mb-2 text-slate-900 dark:text-slate-100",
    desc: "text-sm text-gray-500 dark:text-slate-400 mb-4",
    specsContainer: "space-y-2 text-xs text-gray-400 dark:text-slate-400",
    specRow: "flex justify-between",
    specValue: "font-medium text-gray-700 dark:text-slate-200",
  },
  summary: {
    container: "mt-16 bg-slate-900 dark:bg-slate-950 text-stone-300 rounded-3xl p-10 border border-slate-800",
    title: "text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-4",
    grid: "grid grid-cols-1 md:grid-cols-2 gap-12",
    columnHeader: "text-orange-400 font-bold mb-4",
    list: "space-y-6",
    itemTitle: "text-white font-medium mb-1",
    itemDesc: "text-sm text-slate-300",
    quoteContainer: "flex flex-col justify-center",
    quoteBox: "bg-slate-800 dark:bg-slate-900 p-6 rounded-2xl border border-slate-700 dark:border-slate-800",
    quoteText: "italic text-sm leading-relaxed mb-4 text-slate-200",
    quoteAuthor: "text-xs font-bold uppercase text-slate-400"
  }
};

export function AlternativesSection() {
  return (
    <section id="alternatives" className={styles.section}>
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>ทางเลือกอื่นที่น่าสนใจ</h2>
        <p className={styles.subtitle}>รุ่นที่ได้รับการแนะนำเป็นพิเศษเพื่อความหลากหลายในการตัดสินใจ</p>
      </div>

      <div className={styles.grid}>
        {/* Alternative Card 1 */}
        <div className={`${styles.card.base} ${styles.card.borderBlue}`}>
          <div className={styles.card.header}>
            <span className={styles.card.badgeBlue}>Premium Daily</span>
            <span className={styles.card.price}>฿7,700</span>
          </div>
          <h4 className={styles.card.name}>Asics Superblast 2</h4>
          <p className={styles.card.desc}>ที่สุดของความสมบูรณ์แบบไร้คาร์บอน เหมาะสำหรับการ "กลืนกินระยะทาง" พร้อมปกป้องข้อต่อสูงสุด</p>
          <div className={styles.card.specsContainer}>
            <div className={styles.card.specRow}><span>โฟม:</span><span className={styles.card.specValue}>FF Turbo+ & FF Blast+ Eco</span></div>
            <div className={styles.card.specRow}><span>น้ำหนัก:</span><span className={styles.card.specValue}>250 กรัม</span></div>
            <div className={styles.card.specRow}><span>ดรอป:</span><span className={styles.card.specValue}>8 มม. (45/37)</span></div>
          </div>
        </div>
        {/* Alternative Card 2 */}
        <div className={`${styles.card.base} ${styles.card.borderRed}`}>
          <div className={styles.card.header}>
            <span className={styles.card.badgeRed}>Nylon Plated Speed</span>
            <span className={styles.card.price}>฿6,290</span>
          </div>
          <h4 className={styles.card.name}>Saucony Endorphin Speed 4</h4>
          <p className={styles.card.desc}>มาตรฐานทองคำของสายทำความเร็ว ใช้แผ่นไนลอนแบบมีปีกเพื่อความยืดหยุ่นที่เป็นธรรมชาติ</p>
          <div className={styles.card.specsContainer}>
            <div className={styles.card.specRow}><span>โฟม:</span><span className={styles.card.specValue}>PWRRUN PB (PEBA)</span></div>
            <div className={styles.card.specRow}><span>น้ำหนัก:</span><span className={styles.card.specValue}>233 กรัม</span></div>
            <div className={styles.card.specRow}><span>ดรอป:</span><span className={styles.card.specValue}>8 มม. (36/28)</span></div>
          </div>
        </div>
        {/* Alternative Card 3 */}
        <div className={`${styles.card.base} ${styles.card.borderGray}`}>
          <div className={styles.card.header}>
            <span className={styles.card.badgeGray}>Reliable Workhorse</span>
            <span className={styles.card.price}>฿4,xxx</span>
          </div>
          <h4 className={styles.card.name}>Puma Velocity Nitro 3</h4>
          <p className={styles.card.desc}>ม้างานที่พึ่งพาได้เสมอ โดดเด่นด้วยพื้นยาง PUMAGRIP ที่ยึดเกาะยอดเยี่ยมในทุกสภาพอากาศ</p>
          <div className={styles.card.specsContainer}>
            <div className={styles.card.specRow}><span>โฟม:</span><span className={styles.card.specValue}>Nitro Foam</span></div>
            <div className={styles.card.specRow}><span>น้ำหนัก:</span><span className={styles.card.specValue}>264 กรัม</span></div>
            <div className={styles.card.specRow}><span>ดรอป:</span><span className={styles.card.specValue}>10 มม. (36/26)</span></div>
          </div>
        </div>
      </div>
      
      <div className={styles.summary.container}>
        <h2 className={styles.summary.title}>สรุปเชิงกลยุทธ์สำหรับการเลือกซื้อ</h2>
        <div className={styles.summary.grid}>
          <div>
            <h4 className={styles.summary.columnHeader}>เลือกรองเท้าตาม "เป้าหมาย"</h4>
            <div className={styles.summary.list}>
              <div>
                <p className={styles.summary.itemTitle}>มือใหม่ / เน้นความมั่นคง:</p>
                <p className={styles.summary.itemDesc}>มองหา <strong>adidas Adizero SL 2</strong> หรือ <strong>Puma Velocity Nitro 3</strong> เพื่อความปลอดภัยของข้อเท้า</p>
              </div>
              <div>
                <p className={styles.summary.itemTitle}>ซ้อมหนักทุกวัน / เน้นนุ่มสบาย:</p>
                <p className={styles.summary.itemDesc}><strong>Asics Novablast 5</strong> คือคำตอบที่ครอบคลุมที่สุดในราคาที่เหมาะสม</p>
              </div>
              <div>
                <p className={styles.summary.itemTitle}>ทำความเร็ว / งบจำกัด:</p>
                <p className={styles.summary.itemDesc}>ไม่ควรพลาด <strong>Anta Zone 2 90</strong> ที่จะให้ฟีลรองเท้าแข่งในราคากลางๆ</p>
              </div>
            </div>
          </div>
          <div className={styles.summary.quoteContainer}>
            <div className={styles.summary.quoteBox}>
              <p className={styles.summary.quoteText}>"ไม่มีรองเท้าที่ดีที่สุดสำหรับทุกคน มีเพียงรองเท้าที่ตอบโจทย์ชีวกลศาสตร์และเป้าหมายของคุณในวันนี้ได้ดีที่สุดเท่านั้น"</p>
              <p className={styles.summary.quoteAuthor}>— Expert Information Architect</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
