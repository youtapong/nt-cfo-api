# Project Description - NT CFO API

เอกสารนี้อธิบายเกี่ยวกับสถาปัตยกรรม โครงสร้างระบบ ความปลอดภัย และรายละเอียดโมดูลทั้งหมดภายในโครงการ **NT CFO API** (NestJS RESTful API)

---

## 1. ข้อมูลทางเทคนิคเบื้องต้น (Tech Stack)
* **Framework:** NestJS (v11)
* **Language:** TypeScript
* **ORM:** TypeORM
* **Database:** PostgreSQL (Schema: `public`)
* **API Documentation:** Swagger UI (พร้อมการตกแต่งด้วย Swagger Themes และ CSS)

---

## 2. โครงสร้างโฟลเดอร์ของซอร์สโค้ด (Directory Structure)

```text
src/
├── main.ts                   # จุดเริ่มต้นของแอปพลิเคชันและตั้งค่าระบบ (Swagger, Static Assets, Prefix)
├── app.module.ts             # โมดูลหลักที่รวบรวมและตั้งค่าโมดูลย่อยทั้งหมด
├── auth/                     # โมดูลล็อกอินและตรวจสอบสิทธิ์ (JWT, MD5 & Bcrypt support)
├── users/                    # โมดูลจัดการข้อมูลผู้ใช้ (org_user)
├── admin/                    # โมดูลผู้ดูแลระบบ (จัดเก็บสูตร admin_formular และระบุสิทธิ์แอดมิน)
├── standard-cfo/             # โมดูลจัดการข้อมูลมาตรฐานและสถิติ (Std Ef Tgo, Fuel, Groups, Scopes)
├── organization/             # โมดูลจัดการข้อมูลองค์กร (Company, Branch, Building, Asset)
├── emission-calculation/     # โมดูลบันทึกปริมาณการปล่อยก๊าซและการคำนวณ CFO
├── upload/                   # โมดูลอัปโหลดไฟล์และแสดงผลรูปภาพแบบเข้ารหัสสิทธิ์การใช้งาน
└── entities/                 # คลาส TypeORM Entity สำหรับแมปตารางฐานข้อมูล
```

---

## 3. ระบบความปลอดภัยและการกั้นสิทธิ์การใช้งาน (Security & Guards)

### 3.1 AuthGuard (`src/auth/auth.guard.ts`)
* ทำหน้าที่สกัดกั้น Bearer Token จาก Request Header `Authorization`
* ตรวจเช็คความถูกต้องและถอดรหัส (Verify JWT) เพื่อดึงข้อมูล User Payload ใส่ไว้ในวัตถุ `request['user']`
* หากไม่มี Token หรือ Token หมดอายุ จะตอบกลับเป็น `401 Unauthorized` ทันที

### 3.2 AdminGuard (`src/admin/admin.guard.ts`)
* ทำหน้าที่ตรวจสอบหลังจากการถอดรหัส Token สำเร็จ
* ค้นหาข้อมูลผู้ใช้งานในตาราง `org_user` โดยระบุเงื่อนไขให้ผู้ใช้นั้นต้องมีตัวตนจริงในระบบ, มีสถานะการใช้งานเป็นปกติ (`enable = 1` และ `status = 'Active'`)
* ตรวจสอบว่าผู้ใช้นั้นมีบทบาทเป็น **`admin`** เท่านั้น
* หากไม่ใช่แอดมินหรือบัญชีถูกระงับ จะตอบกลับเป็น `403 Forbidden`

---

## 4. รายละเอียดโมดูลระบบย่อย (Application Modules)

### 4.1 Auth Module (`src/auth/`)
* **จุดประสงค์:** จัดการเรื่องการ Login เพื่อสร้าง JWT Token
* **ความยืดหยุ่น:** รองรับรหัสผ่านที่เข้ารหัสแบบ MD5 (สำหรับข้อมูลตั้งต้นดั้งเดิม) และแบบ Bcrypt (สำหรับรหัสผ่านใหม่)

### 4.2 Standard CFO Module (`src/standard-cfo/`)
* **จุดประสงค์:** เป็น Dynamic Engine สำหรับตารางข้อมูลปัจจัยมาตรฐาน (Standard Factors) 
* **ตารางที่เกี่ยวข้อง:** `std_scope`, `std_factor_group`, `std_factor_subgroup`, `std_factor_common`, `std_ef_tgo`, `std_fuel_type`, `std_fuel_brand`, `std_fuel_map_ef`

### 4.3 Organization Module (`src/organization/`)
* **จุดประสงค์:** จัดการข้อมูลโครงสร้างหน่วยงานขององค์กรแบบ Dynamic Engine
* **ตารางที่เกี่ยวข้อง:** `org_user`, `org_company`, `org_branch`, `org_building`, `org_asset`, `org_user_branch`, `org_user_asset`, `org_asset_map_ef_tgo`

### 4.4 Emission & Calculation Module (`src/emission-calculation/`)
* **จุดประสงค์:** บันทึกข้อมูลและประมวลผลคำนวณปริมาณก๊าซเรือนกระจก
* **ตารางที่เกี่ยวข้อง:** `org_emission`, `org_emission_calculate`, `org_emission_evidence`, `calculate`
* **API คำนวณหลัก (CFO Calculations):**
  * `POST /emission-calculation/cfo-calculate`: คำนวณค่าคาร์บอนฟุตพริ้นท์เบื้องต้น โดยอ้างอิงจากข้อมูลสูตร `admin_formular` และดึงอัตราการปล่อยก๊าซจากตาราง `std_ef_tgo`
  * `POST /emission-calculation/cfo-calculate-detail`: ทำงานคำนวณเช่นเดียวกับตัวแรก พร้อมดึงรายละเอียดกลุ่มปัจจัยและข้อมูลเชื้อเพลิงเพิ่มเติมจากตาราง `std_factor_group`, `std_factor_subgroup`, `std_factor_common` และ `std_fuel_type` โดยไม่แสดงข้อมูลฟิลด์ `last_modified`

### 4.5 Admin Module (`src/admin/`)
* **จุดประสงค์:** ดูแลจัดการข้อมูลสูตรคำนวณและตั้งค่าหลังบ้านโดยตรง ผ่านสิทธิ์ของแอดมินเท่านั้น
* **ตารางที่เกี่ยวข้อง:** `admin_formular`
* **ความปลอดภัย:** ทุก Endpoint (`POST`, `GET`, `PATCH`, `DELETE` ไปยัง `/admin/:entity`) จะถูกครอบด้วย `AuthGuard` และ `AdminGuard`

### 4.6 Secure Upload & Media Module (`src/upload/`)
* **จุดประสงค์:** จัดการระบบการบันทึกไฟล์และการดึงภาพไปแสดงผลแบบจำกัดสิทธิ์
* **API ระบบ:**
  * `POST /upload` (Dynamic Upload): อัปโหลดไฟล์ jpeg, jpg, png, pdf ขนาดไม่เกิน 2MB โดยมีการบันทึกไฟล์ไปพักไว้ในโฟลเดอร์ `images/temp` ชั่วคราวก่อนย้ายไปยังชื่อไฟล์และโฟลเดอร์จริงตามที่ Frontend กำหนด
  * `GET /images/:filename` และ `GET /images/:folder/:filename`: ดึงข้อมูลภาพแบบ Stream ผ่านเบราว์เซอร์ โดยบังคับเช็ค Bearer Token (`AuthGuard`) ป้องกันไม่ให้ผู้อื่นนำลิงก์ภาพไปเปิดดูโดยตรง
  * `DELETE /images/:filename` และ `DELETE /images/:folder/:filename`: สั่งลบรูปภาพอย่างปลอดภัยออกจากดิสก์เซิร์ฟเวอร์
