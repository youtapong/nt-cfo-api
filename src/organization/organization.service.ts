import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as crypto from 'crypto';

// Import organization entities
import { OrgUser } from '../entities/org-user.entity';
import { OrgCompany } from '../entities/org-company.entity';
import { OrgBranch } from '../entities/org-branch.entity';
import { OrgBuilding } from '../entities/org-building.entity';
import { OrgAsset } from '../entities/org-asset.entity';
import { OrgUserBranch } from '../entities/org-user-branch.entity';
import { OrgUserAsset } from '../entities/org-user-asset.entity';
import { OrgAssetMapEfTgo } from '../entities/org-asset-map-ef-tgo.entity';

const ENTITY_MAP: Record<string, any> = {
  'org-user': OrgUser,
  'org-company': OrgCompany,
  'org-branch': OrgBranch,
  'org-building': OrgBuilding,
  'org-asset': OrgAsset,
  'org-user-branch': OrgUserBranch,
  'org-user-asset': OrgUserAsset,
  'org-asset-map-ef-tgo': OrgAssetMapEfTgo,
};

@Injectable()
export class OrganizationService {
  constructor(private readonly dataSource: DataSource) {}

  private getRepository(entity: string) {
    const entityClass = ENTITY_MAP[entity.toLowerCase()];
    if (!entityClass) {
      throw new BadRequestException(
        `Entity '${entity}' is invalid for Organization. Supported entities are: ${Object.keys(ENTITY_MAP).join(', ')}`
      );
    }
    return this.dataSource.getRepository(entityClass);
  }

  private getPrimaryKeyName(repository: any): string {
    const metadata = repository.metadata;
    return metadata.primaryColumns[0]?.propertyName || 'id';
  }

  private hashUserPassword(entity: string, body: any) {
    if (entity.toLowerCase() === 'org-user' && body.password) {
      body.password = crypto
        .createHash('md5')
        .update(body.password)
        .digest('hex');
    }
  }

  async create(entity: string, body: any): Promise<any> {
    const repo = this.getRepository(entity);
    this.hashUserPassword(entity, body);
    
    // Add create metadata if applicable
    if (entity.toLowerCase() === 'org-company') {
      body.createDate = new Date();
    }

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
    this.hashUserPassword(entity, body);
    
    // Add update metadata if applicable
    if (entity.toLowerCase() === 'org-company') {
      body.updateDate = new Date();
    }

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
