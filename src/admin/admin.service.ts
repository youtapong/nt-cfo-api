import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AdminFormular } from './admin-formular.entity';

const ENTITY_MAP: Record<string, any> = {
  'admin-formular': AdminFormular,
};

@Injectable()
export class AdminService {
  constructor(private readonly dataSource: DataSource) {}

  private getRepository(entity: string) {
    const entityClass = ENTITY_MAP[entity.toLowerCase()];
    if (!entityClass) {
      throw new BadRequestException(
        `Entity '${entity}' is invalid for Admin. Supported entities are: ${Object.keys(ENTITY_MAP).join(', ')}`
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
