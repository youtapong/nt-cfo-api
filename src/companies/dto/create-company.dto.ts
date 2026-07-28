import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiPropertyOptional({ description: 'ชื่อบริษัท (ภาษาไทย)', example: 'บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน)' })
  companyNameTh?: string;

  @ApiPropertyOptional({ description: 'ชื่อบริษัท (ภาษาอังกฤษ)', example: 'National Telecom Public Company Limited' })
  companyNameEn?: string;

  @ApiPropertyOptional({ description: 'ที่อยู่ของบริษัท', example: '99 ถนนแจ้งวัฒนะ แขวงทุ่งสองห้อง เขตหลักสี่ กรุงเทพมหานคร' })
  address?: string;

  @ApiPropertyOptional({ description: 'ประเภทการคำนวณ', example: 1, default: 1 })
  calculateType?: number;

  @ApiPropertyOptional({ description: 'พิกัด GPS', example: '13.8833, 100.5694' })
  gps?: string;

  @ApiPropertyOptional({ description: 'ชื่อไฟล์รูปภาพบริษัท', example: 'nt_logo.png', default: 'company.png' })
  image?: string;

  @ApiPropertyOptional({ description: 'ชื่อไฟล์ PDF หรือเอกสารแนบ', example: 'cert.pdf', default: 'file.pdf' })
  file?: string;

  @ApiPropertyOptional({ description: 'หมายเหตุ', example: 'สำนักงานใหญ่' })
  remark?: string;

  @ApiPropertyOptional({ description: 'ผู้ใช้งานที่อัปเดตข้อมูล', example: 'admin' })
  updateBy?: string;

  @ApiPropertyOptional({ description: 'ผู้ใช้งานที่สร้างข้อมูล', example: 'admin' })
  createBy?: string;
}
