import { Controller, Get, Param, Res, UseGuards, NotFoundException, Delete } from '@nestjs/common';
import * as express from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import * as path from 'path';
import * as fs from 'fs';

@ApiTags('Secure Image Engine')
@ApiBearerAuth()
@Controller('images')
export class ImageController {
  
  @Get(':filename')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'เรียกดูรูปภาพจาก root โฟลเดอร์ (ต้องใช้ Bearer Token)' })
  @ApiResponse({ status: 200, description: 'ดึงรูปภาพสำเร็จ' })
  @ApiResponse({ status: 401, description: 'ไม่มีสิทธิ์การเข้าถึง (Unauthorized)' })
  @ApiResponse({ status: 404, description: 'ไม่พบรูปภาพ' })
  serveImageRoot(
    @Param('filename') filename: string,
    @Res() res: express.Response,
  ) {
    const filePath = path.join(process.cwd(), 'images', filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('ไม่พบรูปภาพที่ต้องการ');
    }

    res.sendFile(filePath);
  }

  @Get(':folder/:filename')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'เรียกดูรูปภาพตามโฟลเดอร์ (ต้องใช้ Bearer Token)' })
  @ApiResponse({ status: 200, description: 'ดึงรูปภาพสำเร็จ' })
  @ApiResponse({ status: 401, description: 'ไม่มีสิทธิ์การเข้าถึง (Unauthorized)' })
  @ApiResponse({ status: 404, description: 'ไม่พบรูปภาพ' })
  serveImage(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Res() res: express.Response,
  ) {
    const filePath = path.join(process.cwd(), 'images', folder, filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('ไม่พบรูปภาพที่ต้องการ');
    }

    res.sendFile(filePath);
  }

  @Delete(':filename')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'ลบรูปภาพจาก root โฟลเดอร์ (ต้องใช้ Bearer Token)' })
  @ApiResponse({ status: 200, description: 'ลบรูปภาพสำเร็จ' })
  @ApiResponse({ status: 401, description: 'ไม่มีสิทธิ์การเข้าถึง (Unauthorized)' })
  @ApiResponse({ status: 404, description: 'ไม่พบรูปภาพ' })
  deleteImageRoot(
    @Param('filename') filename: string,
  ) {
    const filePath = path.join(process.cwd(), 'images', filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('ไม่พบรูปภาพที่ต้องการลบ');
    }

    fs.unlinkSync(filePath);
    return { message: 'ลบรูปภาพสำเร็จ' };
  }

  @Delete(':folder/:filename')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'ลบรูปภาพตามโฟลเดอร์ (ต้องใช้ Bearer Token)' })
  @ApiResponse({ status: 200, description: 'ลบรูปภาพสำเร็จ' })
  @ApiResponse({ status: 401, description: 'ไม่มีสิทธิ์การเข้าถึง (Unauthorized)' })
  @ApiResponse({ status: 404, description: 'ไม่พบรูปภาพ' })
  deleteImage(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
  ) {
    const filePath = path.join(process.cwd(), 'images', folder, filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('ไม่พบรูปภาพที่ต้องการลบ');
    }

    fs.unlinkSync(filePath);
    return { message: 'ลบรูปภาพสำเร็จ' };
  }
}
