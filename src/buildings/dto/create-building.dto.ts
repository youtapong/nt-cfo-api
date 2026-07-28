import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBuildingDto {
  @ApiPropertyOptional({ description: 'รหัสบริษัท (FK)', example: 1 })
  companyId?: number;

  @ApiPropertyOptional({ description: 'รหัสสาขา (FK)', example: 1 })
  branchId?: number;

  @ApiPropertyOptional({ description: 'ชื่ออาคาร', example: 'อาคารสำนักงาน 3 ชั้น' })
  buildingName?: string;

  @ApiPropertyOptional({ description: 'จำนวนพนักงานที่ใช้อาคาร', example: 45 })
  staff?: number;

  @ApiPropertyOptional({ description: 'ปีงบประมาณ/ปีการทำงาน', example: 2026 })
  workYear?: number;

  @ApiPropertyOptional({ description: 'พิกัด GPS ของอาคาร', example: '13.8915, 100.5648' })
  gps?: string;

  @ApiPropertyOptional({ description: 'รูปภาพอาคาร', example: 'building_img.png', default: 'branch.png' })
  image?: string;

  @ApiPropertyOptional({ description: 'หมายเหตุ', example: 'มีแผงโซลาร์เซลล์ติดตั้งบนดาดฟ้า' })
  remark?: string;
}
