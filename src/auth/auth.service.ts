import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      return null;
    }

    // Support both MD5 (for legacy seed data) and Bcrypt (for newer hashed passwords)
    const md5Hash = crypto.createHash('md5').update(pass).digest('hex');
    let isMatch = false;

    if (user.password === md5Hash) {
      isMatch = true;
    } else {
      try {
        isMatch = await bcrypt.compare(pass, user.password);
      } catch (err) {
        // password might not be bcrypt hashed
        isMatch = false;
      }
    }

    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role,
      firstname: user.firstname,
      lastname: user.lastname,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
