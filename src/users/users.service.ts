import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { OrgUser } from '../entities/org-user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(OrgUser)
    private usersRepository: Repository<OrgUser>,
  ) {}

  async findOneByUsername(username: string): Promise<OrgUser | null> {
    return this.usersRepository.findOne({
      where: { username, enable: 1, status: ILike('active') },
      select: {
        userId: true,
        username: true,
        password: true,
        role: true,
        firstname: true,
        lastname: true,
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<OrgUser> {
    const hashedPassword = crypto
      .createHash('md5')
      .update(createUserDto.password)
      .digest('hex');

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<OrgUser[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<OrgUser> {
    const user = await this.usersRepository.findOne({
      where: { userId: id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<OrgUser> {
    const user = await this.findOne(id);
    
    if (updateUserDto.password) {
      updateUserDto.password = crypto
        .createHash('md5')
        .update(updateUserDto.password)
        .digest('hex');
    }

    const updatedUser = this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}
