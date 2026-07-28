import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'ชื่อผู้ใช้งาน (เช่น admin, youtapong)', example: 'admin' })
  username!: string;

  @ApiProperty({ description: 'รหัสผ่าน', example: '123456' })
  password!: string;
}
