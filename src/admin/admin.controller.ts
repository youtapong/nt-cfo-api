import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from './admin.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Dynamic Admin Role API Engine')
@ApiBearerAuth()
@UseGuards(AuthGuard, AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post(':entity')
  @ApiOperation({ summary: 'สร้างข้อมูลของ Admin (Dynamic Create)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น admin-formular' })
  @ApiBody({ schema: { type: 'object', description: 'JSON Body ของข้อมูลที่ต้องการบันทึก' } })
  @ApiResponse({ status: 201, description: 'สร้างข้อมูลสำเร็จ' })
  create(@Param('entity') entity: string, @Body() body: any) {
    return this.adminService.create(entity, body);
  }

  @Get(':entity')
  @ApiOperation({ summary: 'ดึงข้อมูลของ Admin ทั้งหมด (Dynamic Read All)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น admin-formular' })
  @ApiResponse({ status: 200, description: 'ดึงข้อมูลสำเร็จ' })
  findAll(@Param('entity') entity: string) {
    return this.adminService.findAll(entity);
  }

  @Get(':entity/:id')
  @ApiOperation({ summary: 'ดึงข้อมูลของ Admin ตาม ID (Dynamic Read One)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น admin-formular' })
  @ApiResponse({ status: 200, description: 'ดึงข้อมูลสำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  findOne(@Param('entity') entity: string, @Param('id', ParseIntPipe) id: number) {
    return this.adminService.findOne(entity, id);
  }

  @Patch(':entity/:id')
  @ApiOperation({ summary: 'อัปเดตข้อมูลของ Admin ตาม ID (Dynamic Update)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น admin-formular' })
  @ApiBody({ schema: { type: 'object', description: 'JSON Body ของข้อมูลส่วนที่ต้องการปรับปรุง' } })
  @ApiResponse({ status: 200, description: 'อัปเดตสำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  update(
    @Param('entity') entity: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.adminService.update(entity, id, body);
  }

  @Delete(':entity/:id')
  @ApiOperation({ summary: 'ลบข้อมูลของ Admin ตาม ID (Dynamic Delete)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น admin-formular' })
  @ApiResponse({ status: 200, description: 'ลบสำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  remove(@Param('entity') entity: string, @Param('id', ParseIntPipe) id: number) {
    return this.adminService.remove(entity, id);
  }
}
