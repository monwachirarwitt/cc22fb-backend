


// ดึงตัวจัดการฐานข้อมูล (Prisma Client) ที่เราสร้างไว้มาใช้งาน
import { prisma } from '../lib/prisma.js'

// สร้างและส่งออกฟังก์ชันแบบ Asynchronous โดยรับค่า 'signal' (สัญญาณสั่งปิดโปรแกรม)
export default async function shutdownU (signal) {
  // 1. แจ้งเตือนใน Terminal ว่าได้รับคำสั่งให้ปิดเซิร์ฟเวอร์แล้ว (เช่น กด Ctrl+C)
  console.log(`\nReceived ${signal}, shutting down...`);
  
  try {
    // 2. พยายามสั่งตัดการเชื่อมต่อฐานข้อมูลอย่างปลอดภัย (คืน Connection ให้ระบบ)
    await prisma.$disconnect();
    console.log('Prisma disconnected.');
    
  } catch (err) {
    // 3. ถ้าเกิดข้อผิดพลาดระหว่างกำลังตัดการเชื่อมต่อ ให้แสดง Error ออกมา
    console.error('Error during disconnection:', err);
    
  } finally {  
    // 4. ขั้นตอนสุดท้าย: ไม่ว่าจะตัดการเชื่อมต่อ "สำเร็จ" หรือ "เกิด Error" ก็ตาม
    // สั่งให้โปรแกรม Node.js ปิดตัวเองลงอย่างสมบูรณ์ (0 หมายถึงปิดแบบปกติ)
    process.exit(0); 
  }
}
