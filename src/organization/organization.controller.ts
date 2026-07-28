import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Dynamic Organization API Engine')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post(':entity')
  @ApiOperation({ summary: 'สร้างข้อมูลองค์กรใหม่ (Dynamic Create)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น org-user, org-company, org-branch, org-building, org-asset' })
  @ApiBody({ schema: { type: 'object', description: 'JSON Body ของข้อมูลที่ต้องการบันทึก' } })
  @ApiResponse({ status: 201, description: 'สร้างข้อมูลสำเร็จ' })
  create(@Param('entity') entity: string, @Body() body: any) {
    return this.organizationService.create(entity, body);
  }

  @Get(':entity')
  @ApiOperation({ summary: 'ดึงข้อมูลองค์กรทั้งหมด (Dynamic Read All)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น org-user, org-company, org-branch, org-building, org-asset' })
  @ApiResponse({ status: 200, description: 'ดึงข้อมูลสำเร็จ' })
  findAll(@Param('entity') entity: string) {
    return this.organizationService.findAll(entity);
  }

  @Get(':entity/:id')
  @ApiOperation({ summary: 'ดึงข้อมูลองค์กรตาม ID (Dynamic Read One)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น org-user, org-company, org-branch, org-building, org-asset' })
  @ApiResponse({ status: 200, description: 'ดึงข้อมูลสำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  findOne(@Param('entity') entity: string, @Param('id', ParseIntPipe) id: number) {
    return this.organizationService.findOne(entity, id);
  }

  @Patch(':entity/:id')
  @ApiOperation({ summary: 'อัปเดตข้อมูลองค์กรตาม ID (Dynamic Update)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น org-user, org-company, org-branch, org-building, org-asset' })
  @ApiBody({ schema: { type: 'object', description: 'JSON Body ของข้อมูลส่วนที่ต้องการปรับปรุง' } })
  @ApiResponse({ status: 200, description: 'อัปเดตสำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  update(
    @Param('entity') entity: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.organizationService.update(entity, id, body);
  }

  @Delete(':entity/:id')
  @ApiOperation({ summary: 'ลบข้อมูลองค์กรตาม ID (Dynamic Delete)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น org-user, org-company, org-branch, org-building, org-asset' })
  @ApiResponse({ status: 200, description: 'ลบสำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  remove(@Param('entity') entity: string, @Param('id', ParseIntPipe) id: number) {
    return this.organizationService.remove(entity, id);
  }
}
