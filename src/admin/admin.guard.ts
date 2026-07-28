import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { DataSource, ILike } from 'typeorm';
import { OrgUser } from '../entities/org-user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private dataSource: DataSource) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userPayload = request.user;
    if (!userPayload || !userPayload.sub) {
      throw new UnauthorizedException('กรุณาเข้าสู่ระบบ');
    }

    const userId = userPayload.sub;
    console.log('AdminGuard - userPayload:', userPayload);
    console.log('AdminGuard - userId:', userId, typeof userId);
    const orgUserRepository = this.dataSource.getRepository(OrgUser);
    const user = await orgUserRepository.findOne({
      where: { userId: userId, enable: 1, status: ILike('active') },
    });
    console.log('AdminGuard - queried user:', user);

    if (!user) {
      throw new ForbiddenException('ไม่พบผู้ใช้งานนี้ในระบบ หรือบัญชีถูกระงับการใช้งาน');
    }

    if (user.role !== 'admin') {
      throw new ForbiddenException('ไม่มีสิทธิ์เข้าถึงส่วนนี้ (สำหรับผู้ดูแลระบบเท่านั้น)');
    }

    return true;
  }
}
