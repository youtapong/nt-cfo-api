import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'เข้าสู่ระบบเพื่อรับ JWT Token' })
  @ApiResponse({ status: 200, description: 'เข้าสู่ระบบสำเร็จ คืนค่า access_token' })
  @ApiResponse({ status: 401, description: 'ข้อมูลชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Username หรือ Password ไม่ถูกต้อง');
    }
    return this.authService.login(user);
  }
}
