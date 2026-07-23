import React from 'react';

interface TooltipProps {
  label: React.ReactNode;
  hintKey: 'stack' | 'drop' | 'foam' | 'tech' | 'weight' | 'price' | 'goal';
  isRightAligned?: boolean;
}

const hints = {
  'stack': 'ความหนาของพื้น (ส้น/หน้าเท้า) หน่วยเป็นมิลลิเมตร ยิ่งหนายิ่งซับแรงกระแทกได้ดีแต่อาจเสียความมั่นคง',
  'drop': 'ความต่างระดับระหว่างส้นเท้ากับหน้าเท้า (มม.) มีผลต่อท่าวิ่งและจุดลงน้ำหนักของฝ่าเท้า',
  'foam': 'วัสดุโฟมซับแรงกระแทก เป็นตัวกำหนดคาแรคเตอร์ความ "นุ่ม" และความ "เด้ง" (Energy Return)',
  'tech': 'โครงสร้างเทคโนโลยีเสริม (เช่น แผ่นคาร์บอน, แกนไฟเบอร์) ช่วยเพิ่มความนิ่งและแรงดีดส่งตัว',
  'weight': 'น้ำหนักของรองเท้า ยิ่งเบายิ่งใช้พลังงานในการแกว่งขาน้อยลง ประหยัดแรงในระยะไกล',
  'price': 'ราคาประเมินเบื้องต้น อาจมีการเปลี่ยนแปลงขึ้นอยู่กับโปรโมชั่นของแต่ละร้านค้า',
  'goal': 'รูปแบบการวิ่งหรือระยะทางที่รองเท้าคู่นี้ถูกออกแบบมาให้ทำผลงานได้ดีที่สุด'
};

export function Tooltip({ label, hintKey, isRightAligned = false }: Readonly<TooltipProps>) {
  const hint = hints[hintKey];
  const positionClass = isRightAligned ? 'right-0' : 'left-0';
  const trianglePositionClass = isRightAligned ? 'right-4' : 'left-4';

  if (!hint) return <>{label}</>;

  return (
    <span className="group/tooltip relative inline-flex items-center cursor-help border-b border-dotted border-gray-400 hover:text-orange-600 transition-colors">
      {label}
      <span className={`invisible group-hover/tooltip:visible opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 absolute bottom-[120%] ${positionClass} w-56 p-2.5 bg-gray-800 text-white text-xs leading-relaxed rounded-xl text-left z-[99] shadow-xl pointer-events-none font-normal tracking-wide`}>
        {hint}
        <svg className={`absolute text-gray-800 h-2 w-4 ${trianglePositionClass} top-full`} x="0px" y="0px" viewBox="0 0 255 255">
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
        </svg>
      </span>
    </span>
  );
}
