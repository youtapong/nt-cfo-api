import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

// Import standard entities
import { StdScope } from '../entities/std-scope.entity';
import { StdFactorGroup } from '../entities/std-factor-group.entity';
import { StdFactorSubgroup } from '../entities/std-factor-subgroup.entity';
import { StdFactorCommon } from '../entities/std-factor-common.entity';
import { StdEfTgo } from '../entities/std-ef-tgo.entity';
import { StdFuelType } from '../entities/std-fuel-type.entity';
import { StdFuelBrand } from '../entities/std-fuel-brand.entity';
import { StdFuelMapEf } from '../entities/std-fuel-map-ef.entity';

const ENTITY_MAP: Record<string, any> = {
  'std-scope': StdScope,
  'std-factor-group': StdFactorGroup,
  'std-factor-subgroup': StdFactorSubgroup,
  'std-factor-common': StdFactorCommon,
  'std-ef-tgo': StdEfTgo,
  'std-fuel-type': StdFuelType,
  'std-fuel-brand': StdFuelBrand,
  'std-fuel-map-ef': StdFuelMapEf,
};

@Injectable()
export class StandardCfoService {
  constructor(private readonly dataSource: DataSource) {}

  private getRepository(entity: string) {
    const entityClass = ENTITY_MAP[entity.toLowerCase()];
    if (!entityClass) {
      throw new BadRequestException(
        `Entity '${entity}' is invalid for Standard-CFO. Supported entities are: ${Object.keys(ENTITY_MAP).join(', ')}`
      );
    }
    return this.dataSource.getRepository(entityClass);
  }

  private getPrimaryKeyName(repository: any): string {
    const metadata = repository.metadata;
    return metadata.primaryColumns[0]?.propertyName || 'id';
  }

  async create(entity: string, body: any): Promise<any> {
    const repo = this.getRepository(entity);
    const newRecord = repo.create(body);
    return repo.save(newRecord);
  }

  async findAll(entity: string): Promise<any[]> {
    const repo = this.getRepository(entity);
    return repo.find();
  }

  async findOne(entity: string, id: number): Promise<any> {
    const repo = this.getRepository(entity);
    const pkName = this.getPrimaryKeyName(repo);
    const record = await repo.findOne({ where: { [pkName]: id } });
    if (!record) {
      throw new NotFoundException(`Record with ID ${id} in ${entity} not found`);
    }
    return record;
  }

  async update(entity: string, id: number, body: any): Promise<any> {
    const repo = this.getRepository(entity);
    const pkName = this.getPrimaryKeyName(repo);
    const record = await this.findOne(entity, id);
    const updatedRecord = repo.merge(record, body);
    return repo.save(updatedRecord);
  }

  async remove(entity: string, id: number): Promise<void> {
    const repo = this.getRepository(entity);
    const pkName = this.getPrimaryKeyName(repo);
    const record = await this.findOne(entity, id);
    await repo.remove(record);
  }
}
