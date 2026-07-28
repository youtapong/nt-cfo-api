import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ImageController } from './image.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UploadController, ImageController],
})
export class UploadModule {}
