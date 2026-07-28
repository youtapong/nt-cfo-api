import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EmissionCalculationService } from './emission-calculation.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Dynamic Emission & Calculation API Engine')
@Controller('emission-calculation')
export class EmissionCalculationController {
  constructor(private readonly emissionCalculationService: EmissionCalculationService) {}

  @Post('cfo-calculate')
  @ApiOperation({ summary: 'คำนวณค่า CFO (CFO Calculation)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number', example: 100 },
        formular_id: { type: 'number', example: 1 }
      },
      required: ['amount', 'formular_id']
    }
  })
  @ApiResponse({ status: 200, description: 'คำนวณสำเร็จ' })
  async calculateCfo(@Body() body: { amount: number; formular_id: number }) {
    return this.emissionCalculationService.calculateCfo(body.amount, body.formular_id);
  }

  @Post('cfo-calculate-detail')
  @ApiOperation({ summary: 'คำนวณค่า CFO พร้อมรายละเอียดกลุ่มปัจจัยและประเภทเชื้อเพลิง (CFO Calculation with Details)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number', example: 100 },
        formular_id: { type: 'number', example: 1 }
      },
      required: ['amount', 'formular_id']
    }
  })
  @ApiResponse({ status: 200, description: 'คำนวณสำเร็จพร้อมรายละเอียด' })
  async calculateCfoDetail(@Body() body: { amount: number; formular_id: number }) {
    return this.emissionCalculationService.calculateCfoDetail(body.amount, body.formular_id);
  }

  @Post(':entity')
  @ApiOperation({ summary: 'สร้างข้อมูลบันทึก/คำนวณใหม่ (Dynamic Create)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น org-emission, org-emission-calculate, calculate' })
  @ApiBody({ schema: { type: 'object', description: 'JSON Body ของข้อมูลที่ต้องการบันทึก' } })
  @ApiResponse({ status: 201, description: 'สร้างข้อมูลสำเร็จ' })
  create(@Param('entity') entity: string, @Body() body: any) {
    return this.emissionCalculationService.create(entity, body);
  }

  @Get(':entity')
  @ApiOperation({ summary: 'ดึงข้อมูลบันทึก/คำนวณทั้งหมด (Dynamic Read All)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น org-emission, org-emission-calculate, calculate' })
  @ApiResponse({ status: 200, description: 'ดึงข้อมูลสำเร็จ' })
  findAll(@Param('entity') entity: string) {
    return this.emissionCalculationService.findAll(entity);
  }

  @Get(':entity/:id')
  @ApiOperation({ summary: 'ดึงข้อมูลบันทึก/คำนวณตาม ID (Dynamic Read One)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น org-emission, org-emission-calculate, calculate' })
  @ApiResponse({ status: 200, description: 'ดึงข้อมูลสำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  findOne(@Param('entity') entity: string, @Param('id', ParseIntPipe) id: number) {
    return this.emissionCalculationService.findOne(entity, id);
  }

  @Patch(':entity/:id')
  @ApiOperation({ summary: 'อัปเดตข้อมูลบันทึก/คำนวณตาม ID (Dynamic Update)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น org-emission, org-emission-calculate, calculate' })
  @ApiBody({ schema: { type: 'object', description: 'JSON Body ของข้อมูลส่วนที่ต้องการปรับปรุง' } })
  @ApiResponse({ status: 200, description: 'อัปเดตสำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  update(
    @Param('entity') entity: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.emissionCalculationService.update(entity, id, body);
  }

  @Delete(':entity/:id')
  @ApiOperation({ summary: 'ลบข้อมูลบันทึก/คำนวณตาม ID (Dynamic Delete)' })
  @ApiParam({ name: 'entity', description: 'ชื่อ Entity เช่น org-emission, org-emission-calculate, calculate' })
  @ApiResponse({ status: 200, description: 'ลบสำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  remove(@Param('entity') entity: string, @Param('id', ParseIntPipe) id: number) {
    return this.emissionCalculationService.remove(entity, id);
  }
}
