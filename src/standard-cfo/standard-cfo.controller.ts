import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { StandardCfoService } from './standard-cfo.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Dynamic Standard-CFO API Engine')
@Controller('standard-cfo')
export class StandardCfoController {
  constructor(private readonly standardCfoService: StandardCfoService) {}

  @Post(':entity')
  @ApiOperation({ summary: 'สร้างข้อมูลมาตรฐานใหม่ (Dynamic Create)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น std-scope, std-factor-group, std-ef-tgo' })
  @ApiBody({ schema: { type: 'object', description: 'JSON Body ของข้อมูลที่ต้องการบันทึก' } })
  @ApiResponse({ status: 201, description: 'สร้างข้อมูลสำเร็จ' })
  create(@Param('entity') entity: string, @Body() body: any) {
    return this.standardCfoService.create(entity, body);
  }

  @Get(':entity')
  @ApiOperation({ summary: 'ดึงข้อมูลมาตรฐานทั้งหมด (Dynamic Read All)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น std-scope, std-factor-group, std-ef-tgo' })
  @ApiResponse({ status: 200, description: 'ดึงข้อมูลสำเร็จ' })
  findAll(@Param('entity') entity: string) {
    return this.standardCfoService.findAll(entity);
  }

  @Get(':entity/:id')
  @ApiOperation({ summary: 'ดึงข้อมูลมาตรฐานตาม ID (Dynamic Read One)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น std-scope, std-factor-group, std-ef-tgo' })
  @ApiResponse({ status: 200, description: 'ดึงข้อมูลสำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  findOne(@Param('entity') entity: string, @Param('id', ParseIntPipe) id: number) {
    return this.standardCfoService.findOne(entity, id);
  }

  @Patch(':entity/:id')
  @ApiOperation({ summary: 'อัปเดตข้อมูลมาตรฐานตาม ID (Dynamic Update)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น std-scope, std-factor-group, std-ef-tgo' })
  @ApiBody({ schema: { type: 'object', description: 'JSON Body ของข้อมูลส่วนที่ต้องการปรับปรุง' } })
  @ApiResponse({ status: 200, description: 'อัปเดตสำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  update(
    @Param('entity') entity: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.standardCfoService.update(entity, id, body);
  }

  @Delete(':entity/:id')
  @ApiOperation({ summary: 'ลบข้อมูลมาตรฐานตาม ID (Dynamic Delete)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น std-scope, std-factor-group, std-ef-tgo' })
  @ApiResponse({ status: 200, description: 'ลบสำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  remove(@Param('entity') entity: string, @Param('id', ParseIntPipe) id: number) {
    return this.standardCfoService.remove(entity, id);
  }
}
