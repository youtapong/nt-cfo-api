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
* **จุดประสงค์:** ควบคุมและตรวจสอบความปลอดภัยการเข้าสู่ระบบเพื่อผลิต JWT Token (Access Token) ให้กับ Frontend นำไปใช้ใน Request Header ถัดไป
* **กลไกการเข้ารหัสและการตรวจสอบสิทธิ์:**
  1. เมื่อผู้ใช้ส่ง `username` และ `password` เข้ามา ระบบจะดึงข้อมูลผู้ใช้จากตาราง `org_user` โดยกำหนดเงื่อนไขว่าต้องเป็นผู้ใช้ที่เปิดใช้งานอยู่ (`enable = 1` และ `status = 'active'`)
  2. การตรวจสอบรหัสผ่าน (Password Verification) จะรองรับ 2 รูปแบบเพื่อความยืดหยุ่น:
     * **MD5 Hashing (Legacy):** ถอดรหัสผ่านด้วย MD5 หากตรงกับข้อมูลในคอลัมน์ `password` จะถือว่าผ่าน (สำหรับชุดข้อมูล seed เดิม)
     * **Bcrypt Hashing (Modern):** หากระบบตรวจไม่พบการแมตช์ด้วย MD5 ระบบจะใช้ `bcrypt.compare` ตรวจสอบรหัสผ่านที่ส่งมากับรหัสผ่านที่ถูกแฮชด้วย Bcrypt ในฐานข้อมูล
  3. เมื่อข้อมูลรหัสผ่านผ่านการตรวจสอบอย่างถูกต้อง ระบบจะออก Access Token (JWT) ที่บรรจุข้อมูล Payload ได้แก่ `username`, `sub` (คีย์หลัก userId), `role`, `firstname` และ `lastname` โดย Token นี้จะมีระยะเวลาหมดอายุตามการตั้งค่าใน Environment (`JWT_EXPIRATION` ซึ่งค่าเริ่มต้นคือ `1d`)

### 4.2 Standard CFO Module (`src/standard-cfo/`)
* **จุดประสงค์:** เป็น Engine ข้อมูลปัจจัยอ้างอิงมาตรฐาน (Standard Carbon Footprint Factors) ที่ใช้คำนวณปริมาณการปล่อยก๊าซเรือนกระจก
* **กลไกการทำงานของ Dynamic Engine:**
  * โมดูลนี้พัฒนาขึ้นในลักษณะ **Dynamic API** โดยอนุญาตให้ส่งพารามิเตอร์ `:entity` ผ่าน URL (เช่น `GET /standard-cfo/:entity` หรือ `GET /standard-cfo/:entity/:id`)
  * โค้ดใน Service มีการสร้าง `ENTITY_MAP` เพื่อจับคู่คำค้นหา `:entity` ไปยังคลาส TypeORM Entity จริงโดยอัตโนมัติ:
    * `std-scope` ➡️ `StdScope` (ขอบเขตการปล่อยก๊าซ Scope 1, 2, 3)
    * `std-factor-group` ➡️ `StdFactorGroup` (กลุ่มกิจกรรม เช่น Mobile Combustion)
    * `std-factor-subgroup` ➡️ `StdFactorSubgroup` (กลุ่มย่อยกิจกรรม เช่น On Road, Off Road)
    * `std-factor-common` ➡️ `StdFactorCommon` (คีย์ร่วมของกิจกรรม)
    * `std-ef-tgo` ➡️ `StdEfTgo` (ค่าปัจจัยการปล่อยก๊าซอ้างอิงจาก TGO เช่น ค่า kgCO2, kgCH4, kgN2O, kgTotalCo2e)
    * `std-fuel-type` ➡️ `StdFuelType` (ประเภทของเชื้อเพลิง เช่น เบนซิน ดีเซล)
    * `std-fuel-brand` ➡️ `StdFuelBrand` (ยี่ห้อน้ำมัน/ผู้ให้บริการ)
    * `std-fuel-map-ef` ➡️ `StdFuelMapEf` (ตารางจับคู่เชื้อเพลิงกับค่าปัจจัย)
  * รองรับ HTTP Methods ครบถ้วน ได้แก่ **`POST`** (สร้างใหม่), **`GET`** (อ่านทั้งหมด/อ่านตาม ID), **`PATCH`** (อัปเดตข้อมูลบางส่วน) และ **`DELETE`** (ลบข้อมูล) โดยใช้ TypeORM Repository จัดการร่วมกันบนฐานข้อมูล PostgreSQL

### 4.3 Organization Module (`src/organization/`)
* **จุดประสงค์:** จัดการข้อมูลโครงสร้างหน่วยงาน เครือข่าย และสินทรัพย์ทางกายภาพขององค์กร
* **กลไกการทำงานแบบ Dynamic Engine:**
  * ใช้สถาปัตยกรรมแบบเดียวกับโมดูล Standard CFO โดยมี `ENTITY_MAP` แมปตัวแปร `:entity` ดังนี้:
    * `org-user` ➡️ `OrgUser` (ตารางพนักงาน/ผู้ใช้งานระบบ)
    * `org-company` ➡️ `OrgCompany` (ตารางข้อมูลบริษัท)
    * `org-branch` ➡️ `OrgBranch` (ตารางข้อมูลสาขา)
    * `org-building` ➡️ `OrgBuilding` (ตารางข้อมูลอาคาร)
    * `org-asset` ➡️ `OrgAsset` (ตารางรายการสินทรัพย์ที่ต้องการคำนวณ เช่น รถยนต์ เครื่องปรับอากาศ)
    * `org-user-branch` ➡️ `OrgUserBranch` (การจัดสรรผู้ใช้งานเข้ากับสาขา)
    * `org-user-asset` ➡️ `OrgUserAsset` (การจัดสรรผู้ใช้งานเข้ากับสินทรัพย์)
    * `org-asset-map-ef-tgo` ➡️ `OrgAssetMapEfTgo` (การผูกสินทรัพย์เข้ากับค่าดัชนี EF TGO)
  * มีการเสริมความปลอดภัยในขั้นตอน **Create/Update** ของ `org-user` โดยจะแปลงรหัสผ่านใหม่ให้เป็น MD5/Bcrypt โดยอัตโนมัติก่อนบันทึกลงฐานข้อมูล

### 4.4 Emission & Calculation Module (`src/emission-calculation/`)
* **จุดประสงค์:** ประมวลผลและบันทึกประวัติการคำนวณปริมาณการปล่อยก๊าซเรือนกระจกรายปี/รายสาขาของหน่วยงาน
* **การแมป Entity แบบ Dynamic:**
  * จัดการโมดูลย่อยเกี่ยวกับข้อมูลการคำนวณด้วย `ENTITY_MAP` ได้แก่:
    * `org-emission` ➡️ `OrgEmission` (ตารางบันทึกกิจกรรมปล่อยก๊าซ)
    * `org-emission-calculate` ➡️ `OrgEmissionCalculate` (ตารางย่อยเก็บข้อมูลการคำนวณของกิจกรรม)
    * `org-emission-evidence` ➡️ `OrgEmissionEvidence` (ตารางเก็บหลักฐาน/รูปภาพประกอบการบันทึก)
    * `calculate` ➡️ `Calculate` (ตารางบันทึกผลการคำนวณสรุป)
* **สูตรประมวลผลคำนวณคาร์บอนฟุตพริ้นท์ (CFO Calculation Logic):**
  เมื่อได้รับอินพุตเป็นปริมาณกิจกรรม (`amount`) และไอดีสูตรคำนวณ (`formular_id`) ระบบจะทำการดึงสูตรจากตาราง `admin_formular` และคำนวณตามลูปย่อย TGO 5 ระดับ (TGO1 - TGO5):
  $$\text{sum\_kg\_CO2} = \frac{(\text{kg\_CO2จาก std\_ef\_tgo} \times \text{amount}) \times \text{ef\_tgo\_percentตามสูตร}}{100}$$
  $$\text{sum\_kg\_CH4} = \frac{(\text{kg\_CH4จาก std\_ef\_tgo} \times \text{amount}) \times \text{ef\_tgo\_percentตามสูตร}}{100}$$
  $$\text{sum\_kg\_N2O} = \frac{(\text{kg\_N2Oจาก std\_ef\_tgo} \times \text{amount}) \times \text{ef\_tgo\_percentตามสูตร}}{100}$$
  $$\text{sum\_kg\_Total\_co2e} = \frac{(\text{kg\_Total\_co2eจาก std\_ef\_tgo} \times \text{amount}) \times \text{ef\_tgo\_percentตามสูตร}}{100}$$
* **API สำหรับการประมวลผล:**
  1. `POST /emission-calculation/cfo-calculate`: ทำการประมวลผลคำนวณตัวเลขและค่าผลรวมสะสมคาร์บอน `Total_co2e5` จาก TGO 5 ระดับ ส่งกลับเป็นอาร์เรย์ผลลัพธ์
  2. `POST /emission-calculation/cfo-calculate-detail`: ทำการประมวลผล CFO เช่นเดียวกัน แต่จะดึงความเชื่อมโยงของสูตรไปยังรายละเอียดข้อมูลต้นทางแบบลึก ได้แก่ ข้อมูลกลุ่มปัจจัย (`std_factor_group`), ข้อมูลกลุ่มย่อย (`std_factor_subgroup`), ข้อมูลรายละเอียดปัจจัยทั่วไป (`std_factor_common`) และประเภทของเชื้อเพลิงที่จับคู่ได้ (`std_fuel_type`) โดยข้อมูลทั้งหมดนี้จะถูกคัดกรองคีย์ `lastModified` ออก เพื่อลดความซ้ำซ้อนของข้อมูลฝั่งหน้าบ้าน

### 4.5 Admin Module (`src/admin/`)
* **จุดประสงค์:** เป็นประตูด่านหน้าสำหรับการตั้งค่า ควบคุมสูตรคำนวณทางเคมี/พลังงาน ที่จำกัดสิทธิ์เฉพาะผู้ใช้ที่เป็นกลุ่มแอดมินในระบบเท่านั้น
* **ตารางที่เกี่ยวข้อง:** `admin_formular` (สำหรับบันทึกการจับคู่อัตราส่วนร้อยละของค่า TGO ในแต่ละกิจกรรม)
* **ความปลอดภัยระดับสูง (High Security Enforcement):**
  * ทุกๆ ปฏิบัติการในคอนโทรลเลอร์นี้ประกอบด้วย `@UseGuards(AuthGuard, AdminGuard)` ซึ่งบังคับว่า:
    1. ผู้ร้องขอ API ต้องผ่านการ Login และส่ง Token ที่มีอายุใช้งานมา (ตรวจโดย `AuthGuard`)
    2. คีย์ของ ID ผู้ใช้จาก Token จะถูกนำไป Query หาข้อมูลจริงในตาราง `org_user` เพื่อยืนยันว่ายังมีตัวตนและมีบทบาท (role) เป็น `'admin'` จริงในระดับ Database (ตรวจโดย `AdminGuard`)
  * ป้องกันการแอบอ้างสิทธิ์แก้ไขสูตรคำนวณที่อ่อนไหวต่อปริมาณการประเมินคาร์บอนฟุตพริ้นท์ของหน่วยงาน

### 4.6 Secure Upload & Media Module (`src/upload/`)
* **จุดประสงค์:** จัดการระบบการอัปโหลดไฟล์หลักฐาน และรูปภาพ พร้อมควบคุมการสิทธิ์การดาวน์โหลด/เปิดอ่านรูปภาพ
* **กลไกการทำงานของ Engine อัปโหลด (Dynamic File Upload):**
  1. **สเตจไฟล์ชั่วคราว (Temporary Staging):** เมื่อ Frontend อัปโหลดไฟล์เข้ามา Multer Middleware จะทำการนำไฟล์ไบนารีไปเก็บไว้ในไดเรกทอรี `images/temp` ชั่วคราวก่อนและตั้งชื่อไฟล์ด้วยรหัสแบบสุ่ม เพื่อป้องกันปัญหาการอ่านค่าจาก Multipart Body ที่ยังประมวลผลไม่เสร็จ (แก้ปัญหา Multer Gotcha)
  2. **ตรวจสอบกฎของไฟล์ (File Validation):** ทำการตรวจเช็คขนาดไฟล์ไม่เกิน 2MB ผ่าน `MaxFileSizeValidator` และตรวจสอบนามสกุลไฟล์ปลายทางให้รองรับเพียง `jpeg, jpg, png, pdf` ผ่านระบบ `fileFilter` ของ Multer
  3. **ย้ายและสถาปนาไฟล์จริง (Final Move & Rename):** เมื่อระบบได้รับข้อมูลโฟลเดอร์ปลายทาง (`folder`) และชื่อไฟล์ที่ต้องการบันทึกใหม่ (`fileName`) จาก Request Body สำเร็จ ระบบจะใช้คำสั่ง `fs.mkdirSync` สร้างโฟลเดอร์ขึ้นมาใหม่ภายใต้ root `/images` และใช้คำสั่ง `fs.renameSync` ย้ายและเปลี่ยนชื่อไฟล์จากโฟลเดอร์ temp ไปยังตำแหน่งจริงอย่างแม่นยำ
* **การเรียกดูและลบรูปภาพแบบเข้ารหัส (Secure File Server):**
  * เนื่องจากรูปภาพเก็บอยู่ในไดเรกทอรีนอกเซิร์ฟเวอร์แบบปิด (ไม่ได้เปิดบริการ Static Assets แบบสาธารณะ) การเข้าชมรูปภาพจึงจำเป็นต้องเรียกใช้ผ่าน Endpoint:
    * `GET /images/:filename`
    * `GET /images/:folder/:filename`
  * ทั้ง 2 เส้นทางจะถูกควบคุมด้วย `AuthGuard` เสมอ หากผู้ใช้คนอื่นๆ คัดลอกลิงก์ไปเปิดในเว็บตรงๆ โดยไม่ผ่าน Application จะส่งคืนเป็น `401 Unauthorized` ทันที และระบบจะใช้คำสั่ง `res.sendFile` ส่งรูปภาพเป็นไบนารีสตรีมให้กับหน้าบ้านที่ผ่านการส่ง token อย่างถูกต้องเท่านั้น
  * `DELETE` Endpoint ช่วยอำนวยความสะดวกในการล้างไฟล์รูปภาพที่ไม่ใช้งานออกจากเซิร์ฟเวอร์ด้วยฟังก์ชัน `fs.unlinkSync` ภายใต้การควบคุมสิทธิ์ที่เข้มงวดเช่นกัน
