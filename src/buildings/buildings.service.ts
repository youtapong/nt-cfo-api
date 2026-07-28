import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrgBuilding } from '../entities/org-building.entity';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(OrgBuilding)
    private buildingsRepository: Repository<OrgBuilding>,
  ) {}

  async create(createBuildingDto: CreateBuildingDto): Promise<OrgBuilding> {
    const newBuilding = this.buildingsRepository.create(createBuildingDto);
    return this.buildingsRepository.save(newBuilding);
  }

  async findAll(): Promise<OrgBuilding[]> {
    return this.buildingsRepository.find();
  }

  async findOne(id: number): Promise<OrgBuilding> {
    const building = await this.buildingsRepository.findOne({
      where: { buildingId: id },
    });
    if (!building) {
      throw new NotFoundException(`Building with ID ${id} not found`);
    }
    return building;
  }

  async update(id: number, updateBuildingDto: UpdateBuildingDto): Promise<OrgBuilding> {
    const building = await this.findOne(id);
    const updatedBuilding = this.buildingsRepository.merge(building, updateBuildingDto);
    return this.buildingsRepository.save(updatedBuilding);
  }

  async remove(id: number): Promise<void> {
    const building = await this.findOne(id);
    await this.buildingsRepository.remove(building);
  }
}
