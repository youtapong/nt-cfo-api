import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';

// Import organization entities
import { OrgUser } from '../entities/org-user.entity';
import { OrgCompany } from '../entities/org-company.entity';
import { OrgBranch } from '../entities/org-branch.entity';
import { OrgBuilding } from '../entities/org-building.entity';
import { OrgAsset } from '../entities/org-asset.entity';
import { OrgUserBranch } from '../entities/org-user-branch.entity';
import { OrgUserAsset } from '../entities/org-user-asset.entity';
import { OrgAssetMapEfTgo } from '../entities/org-asset-map-ef-tgo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrgUser,
      OrgCompany,
      OrgBranch,
      OrgBuilding,
      OrgAsset,
      OrgUserBranch,
      OrgUserAsset,
      OrgAssetMapEfTgo,
    ]),
  ],
  providers: [OrganizationService],
  controllers: [OrganizationController],
  exports: [OrganizationService],
})
export class OrganizationModule {}
