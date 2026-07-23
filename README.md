# Shoelab (Next.js Edition) 👟🧪

**Shoelab** เป็นแพลตฟอร์มวิเคราะห์และเปรียบเทียบรองเท้าวิ่งเชิงลึก ที่ช่วยให้นักวิ่งสามารถนำข้อมูลสเปครองเท้า (ความหนาพื้น, ชนิดโฟม, น้ำหนัก) มาคำนวณและประเมินเป็นค่าทาง **ฟิสิกส์ (Physical)** และ **ชีวกลศาสตร์ (Biomechanical)** ได้อย่างง่ายดาย

โปรเจกต์นี้พัฒนาต่อยอดมาจากเวอร์ชัน HTML/JS เดิม โดยยกเครื่องใหม่ด้วย **Next.js (App Router)**, **React**, และ **Tailwind CSS** เพื่อให้ทำงานได้รวดเร็ว รองรับ Component-based Architecture และพร้อมสำหรับการ Scale ในอนาคต

---

## ✨ ฟีเจอร์เด่น (Key Features)

- **📊 Dynamic Battle Section (Head-to-Head):** เลือกรองเท้า 2 คู่มาประชันกันแบบตัวต่อตัว พร้อมระบบสร้างกราฟเรดาร์ (Radar Chart) และสรุปผลผู้ชนะให้อัตโนมัติตามสเปคที่วิเคราะห์ได้
- **🔬 Lab Report Modal:** เจาะลึกข้อมูลของรองเท้าแต่ละคู่ด้วยเรดาร์ชาร์ต และตัวเลขเชิงลึก (เช่น Energy Return, Peak GRF, Asker C Softness)
- **📂 Smart Excel Import:** สามารถอัปโหลดไฟล์ Excel เพื่อเพิ่มฐานข้อมูลรองเท้าใหม่ได้ทันที โดยระบบมี **Fallback Logic** ที่สามารถประเมินค่าความเด้ง, ความนุ่ม, และแรงกระแทกได้อัตโนมัติ หากข้อมูลบางคอลัมน์ขาดหายไป
- **💾 Local Storage Persistence:** ข้อมูลที่ Import เข้ามาจะถูกจำไว้ในเบราว์เซอร์อัตโนมัติ ทำให้ข้อมูลไม่หายไปเมื่อกดรีเฟรชหน้าจอ
- **🔍 Smart Search & Filters:** ค้นหารองเท้าจากการพิมพ์ชื่อ หรือกรองตามแบรนด์/จุดประสงค์ได้อย่างรวดเร็ว

---

## 🚀 วิธีการติดตั้งและรันโปรเจกต์ (Getting Started)

โปรเจกต์นี้ใช้ `npm` ในการจัดการแพ็กเกจ

1. **โคลนโปรเจกต์ (Clone the repository)**
   ```bash
   git clone <repository-url>
   cd shoelab-next
   ```

2. **ติดตั้ง Dependencies**
   ```bash
   npm install
   ```

3. **รันเซิร์ฟเวอร์โหมด Development**
   ```bash
   npm run dev
   ```

4. เปิดเบราว์เซอร์และเข้าไปที่ [http://localhost:3000](http://localhost:3000)

---

## 📝 โครงสร้างข้อมูล Excel สำหรับนำเข้า (Import Template)

ระบบรองรับไฟล์ `.xlsx` และ `.csv` โดยมีคอลัมน์หลักดังนี้:

| คอลัมน์ (Column) | คำอธิบาย | ตัวอย่าง |
| :--- | :--- | :--- |
| `brand` | ชื่อแบรนด์ | Adidas |
| `name` | ชื่อรุ่นรองเท้า | Adizero Pro |
| `foam` | ชนิดโฟม | Lightstrike Pro |
| `tech` | เทคโนโลยีเสริม (เช่น คาร์บอน) | EnergyRods |
| `stack` | ความหนา ส้น/หน้าเท้า (มม.) | 39/33 |
| `weight` | น้ำหนัก (กรัม) | 205 |
| `drop` | ความชัน (มม.) | 6 |
| `price` | ราคา (บาท) | 8500 |

*หมายเหตุ: คอลัมน์อื่นๆ เช่น `energy_return_percent`, `stack_heel_mm` หากไม่ได้ระบุ ระบบจะใช้ AI/Logic (ใน `useShoes.ts`) ประเมินค่าให้อัตโนมัติจากชนิดโฟมและความหนาที่ระบุไว้*

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Framework:** Next.js (App Router)
- **UI & Styling:** React, Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Chart.js, react-chartjs-2
- **Data Parsing:** xlsx (SheetJS)

---

## 👨‍💻 การพัฒนาต่อยอด (Development)
- โค้ดส่วนคำนวณและจัดการ State จะอยู่ที่ `src/hooks/useShoes.ts`
- หน้าตาของ Component ต่างๆ แบ่งย่อยตามฟีเจอร์ไว้ใน `src/components/features/`
- หากต้องการปรับปรุงเงื่อนไขการแพ้-ชนะ ใน Battle Section สามารถเข้าไปแก้ไขได้ที่ `src/components/features/BattleSection.tsx`
