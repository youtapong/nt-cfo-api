import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrgBranch } from '../entities/org-branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(OrgBranch)
    private branchesRepository: Repository<OrgBranch>,
  ) {}

  async create(createBranchDto: CreateBranchDto): Promise<OrgBranch> {
    const newBranch = this.branchesRepository.create(createBranchDto);
    return this.branchesRepository.save(newBranch);
  }

  async findAll(): Promise<OrgBranch[]> {
    return this.branchesRepository.find();
  }

  async findOne(id: number): Promise<OrgBranch> {
    const branch = await this.branchesRepository.findOne({
      where: { branchId: id },
    });
    if (!branch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
    return branch;
  }

  async update(id: number, updateBranchDto: UpdateBranchDto): Promise<OrgBranch> {
    const branch = await this.findOne(id);
    const updatedBranch = this.branchesRepository.merge(branch, updateBranchDto);
    return this.branchesRepository.save(updatedBranch);
  }

  async remove(id: number): Promise<void> {
    const branch = await this.findOne(id);
    await this.branchesRepository.remove(branch);
  }
}
