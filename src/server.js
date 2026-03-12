import dotenv from "dotenv";
import app from "./app.js";
// นำเข้าฟังก์ชันที่เราเขียนไว้สำหรับจัดการตอนปิดเซิร์ฟเวอร์
import shutdownU from "./utils/shutdown.utif.js";

// โหลดค่ากำหนดต่างๆ (เช่น PORT, DATABASE_URL) จากไฟล์ .env เข้ามาในระบบ
dotenv.config()

// กำหนดหมายเลข Port ที่จะใช้รันเซิร์ฟเวอร์ (ถ้าใน .env ไม่มี ให้ใช้ 8000 เป็นค่าเริ่มต้น)
const PORT = process.env.PORT || 8000;

// สั่งให้เซิร์ฟเวอร์เริ่มทำงาน (Listen) ตาม Port ที่กำหนด
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

/** * ส่วนของการดักจับ "เหตุการณ์" (Events) จากระบบปฏิบัติการ 
 */

// เมื่อเรากด Ctrl + C ใน Terminal ระบบจะส่งสัญญาณ 'SIGINT' มา
// เราสั่งให้ไปเรียกฟังก์ชัน shutdownU เพื่อปิด Database Connection ก่อนปิดโปรแกรม
process.on('SIGINT', () => shutdownU('SIGINT')) 

// 'SIGTERM' คือสัญญาณสั่งปิดจากระบบ (เช่น ตอนเราสั่งหยุดรันใน Docker หรือ Cloud)
// ให้ทำงานเหมือนกันคือต้องปิดแบบสุภาพ (Graceful Shutdown)
process.on('SIGTERM', () => shutdownU('SIGTERM'))

// Catch unhandled errors
process.on("uncaughtException", ()=>  shutdownU('uncaughtException'))
process.on("unhandledRejection", ()=> shutdownU('unhandledRejection'))