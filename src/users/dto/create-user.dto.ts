import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'ชื่อผู้ใช้งาน (username)', example: 'newuser' })
  username!: string;

  @ApiProperty({ description: 'รหัสผ่าน (password)', example: '123456' })
  password!: string;

  @ApiPropertyOptional({ description: 'บทบาทผู้ใช้ (role)', example: 'user', default: 'user' })
  role?: string;

  @ApiPropertyOptional({ description: 'ตำแหน่งงาน', example: 'IT Developer' })
  jobPosition?: string;

  @ApiPropertyOptional({ description: 'เปิดใช้งาน (1=enable, 0=disable)', example: 1, default: 1 })
  enable?: number;

  @ApiPropertyOptional({ description: 'ชื่อผู้ใช้', example: 'John' })
  firstname?: string;

  @ApiPropertyOptional({ description: 'นามสกุลผู้ใช้', example: 'Doe' })
  lastname?: string;

  @ApiPropertyOptional({ description: 'สถานะ', example: 'active', default: 'active' })
  status?: string;

  @ApiPropertyOptional({ description: 'อีเมล', example: 'john.doe@example.com' })
  email?: string;

  @ApiPropertyOptional({ description: 'เลขบัตรประชาชน', example: '1100101010101' })
  idCard?: string;

  @ApiPropertyOptional({ description: 'ที่อยู่', example: '123 Main St' })
  address?: string;

  @ApiPropertyOptional({ description: 'เบอร์โทรศัพท์', example: '0812345678' })
  phone?: string;

  @ApiPropertyOptional({ description: 'หมายเหตุ', example: 'ผู้ใช้ระดับทดสอบ' })
  note?: string;

  @ApiPropertyOptional({ description: 'รหัสสาขา (FK)', example: 1 })
  branchId?: number;
}
