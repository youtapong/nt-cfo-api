import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CfoService } from './cfo.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Dynamic CFO API Engine')
@Controller('cfo')
export class CfoController {
  constructor(private readonly cfoService: CfoService) {}

  @Post(':entity')
  @ApiOperation({ summary: 'สร้างข้อมูลใหม่ (Dynamic Create)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น std-scope, org-asset, admin-formular' })
  @ApiResponse({ status: 201, description: 'สร้างข้อมูลสำเร็จ' })
  create(@Param('entity') entity: string, @Body() body: any) {
    return this.cfoService.create(entity, body);
  }

  @Get(':entity')
  @ApiOperation({ summary: 'ดึงข้อมูลทั้งหมด (Dynamic Read All)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น std-scope, org-asset, admin-formular' })
  @ApiResponse({ status: 200, description: 'ดึงข้อมูลสำเร็จ' })
  findAll(@Param('entity') entity: string) {
    return this.cfoService.findAll(entity);
  }

  @Get(':entity/:id')
  @ApiOperation({ summary: 'ดึงข้อมูลตาม ID (Dynamic Read One)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น std-scope, org-asset, admin-formular' })
  @ApiResponse({ status: 200, description: 'ดึงข้อมูลสำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  findOne(@Param('entity') entity: string, @Param('id', ParseIntPipe) id: number) {
    return this.cfoService.findOne(entity, id);
  }

  @Patch(':entity/:id')
  @ApiOperation({ summary: 'อัปเดตข้อมูลตาม ID (Dynamic Update)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น std-scope, org-asset, admin-formular' })
  @ApiResponse({ status: 200, description: 'อัปเดตสำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  update(
    @Param('entity') entity: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.cfoService.update(entity, id, body);
  }

  @Delete(':entity/:id')
  @ApiOperation({ summary: 'ลบข้อมูลตาม ID (Dynamic Delete)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น std-scope, org-asset, admin-formular' })
  @ApiResponse({ status: 200, description: 'ลบสำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  remove(@Param('entity') entity: string, @Param('id', ParseIntPipe) id: number) {
    return this.cfoService.remove(entity, id);
  }
}
