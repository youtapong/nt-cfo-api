import { 
  Controller, 
  Post, 
  UseInterceptors, 
  UploadedFile, 
  Body, 
  ParseFilePipe,
  MaxFileSizeValidator,
  BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('Upload API Engine')
@Controller('upload')
export class UploadController {
  
  @Post()
  @ApiOperation({ summary: 'อัปโหลดรูปภาพหรือไฟล์เอกสาร (Dynamic Upload)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'ไฟล์รูปภาพ (jpeg, jpg, png) หรือเอกสาร (pdf) ขนาดไม่เกิน 2MB',
        },
        folder: {
          type: 'string',
          description: 'ชื่อ Folder ที่ต้องการบันทึกภายใต้ images/ เช่น profiles, standard-evidence',
          example: 'profiles',
        },
        fileName: {
          type: 'string',
          description: 'ชื่อไฟล์ใหม่ที่ต้องการบันทึก (ระบุหรือไม่ระบุก็ได้)',
          example: 'user-profile-01',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({ status: 201, description: 'อัปโหลดสำเร็จ' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const tempPath = path.join(process.cwd(), 'images', 'temp');
          if (!fs.existsSync(tempPath)) {
            fs.mkdirSync(tempPath, { recursive: true });
          }
          cb(null, tempPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = path.extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/i)) {
          return cb(new BadRequestException('รองรับเฉพาะไฟล์รูปภาพ (jpg, jpeg, png) และเอกสาร (pdf) เท่านั้น'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }), // 2 MB
        ],
      }),
    )
    file: any,
    @Body('folder') folder: string,
    @Body('fileName') fileName: string,
  ) {
    const targetFolder = folder || '';
    const targetFolderPath = path.join(process.cwd(), 'images', targetFolder);

    if (!fs.existsSync(targetFolderPath)) {
      fs.mkdirSync(targetFolderPath, { recursive: true });
    }

    const fileExt = path.extname(file.originalname);
    const finalFileName = fileName ? `${fileName}${fileExt}` : file.originalname;
    const finalPath = path.join(targetFolderPath, finalFileName);

    // Move file from temp directory to the final destination
    fs.renameSync(file.path, finalPath);

    return {
      message: 'อัปโหลดไฟล์สำเร็จ',
      filename: finalFileName,
      destination: targetFolderPath,
      path: `/images/${targetFolder ? targetFolder + '/' : ''}${finalFileName}`,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}
