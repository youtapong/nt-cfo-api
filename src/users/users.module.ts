import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgUser } from '../entities/org-user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrgUser])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
