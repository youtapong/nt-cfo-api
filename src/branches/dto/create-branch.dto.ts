import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBranchDto {
  @ApiPropertyOptional({ description: 'รหัสบริษัท (FK)', example: 1 })
  companyId?: number;

  @ApiPropertyOptional({ description: 'รหัสสาขาทางกายภาพ/บัญชี', example: 'BR001' })
  branchCode?: string;

  @ApiPropertyOptional({ description: 'ชื่อสาขา', example: 'สำนักงานใหญ่นนทบุรี' })
  branchName?: string;

  @ApiPropertyOptional({ description: 'ข้อมูลอาคารของสาขา', example: 'อาคาร 1' })
  building?: string;

  @ApiPropertyOptional({ description: 'ที่ตั้งสาขา', example: '99 ถ.แจ้งวัฒนะ' })
  address?: string;

  @ApiPropertyOptional({ description: 'จังหวัด', example: 'นนทบุรี' })
  province?: string;

  @ApiPropertyOptional({ description: 'อำเภอ/เขต', example: 'ปากเกร็ด' })
  district?: string;

  @ApiPropertyOptional({ description: 'ตำบล/แขวง', example: 'คลองเกลือ' })
  tumbol?: string;

  @ApiPropertyOptional({ description: 'รหัสไปรษณีย์', example: '11120' })
  postcode?: string;

  @ApiPropertyOptional({ description: 'จำนวนพนักงานในสาขา', example: 120 })
  staff?: number;

  @ApiPropertyOptional({ description: 'ปีงบประมาณ/ปีการทำงาน', example: 2026 })
  workYear?: number;

  @ApiPropertyOptional({ description: 'พิกัด GPS ของสาขา', example: '13.8912, 100.5645' })
  gps?: string;

  @ApiPropertyOptional({ description: 'อีเมลติดต่อสาขา', example: 'branch1@nt.co.th' })
  email?: string;

  @ApiPropertyOptional({ description: 'เบอร์โทรศัพท์ติดต่อ', example: '025001234' })
  phone?: string;

  @ApiPropertyOptional({ description: 'รูปภาพสาขา', example: 'branch_hq.png', default: 'branch.png' })
  image?: string;

  @ApiPropertyOptional({ description: 'หมายเหตุ', example: 'เปิดทำการ 24 ชม.' })
  remark?: string;
}
