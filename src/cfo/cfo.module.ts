import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CfoService } from './cfo.service';
import { CfoController } from './cfo.controller';

// Import all entities
import { StdScope } from '../entities/std-scope.entity';
import { StdFactorGroup } from '../entities/std-factor-group.entity';
import { StdFactorSubgroup } from '../entities/std-factor-subgroup.entity';
import { StdFactorCommon } from '../entities/std-factor-common.entity';
import { StdEfTgo } from '../entities/std-ef-tgo.entity';
import { StdFuelType } from '../entities/std-fuel-type.entity';
import { StdFuelBrand } from '../entities/std-fuel-brand.entity';
import { StdFuelMapEf } from '../entities/std-fuel-map-ef.entity';
import { OrgAsset } from '../entities/org-asset.entity';
import { OrgUserBranch } from '../entities/org-user-branch.entity';
import { OrgUserAsset } from '../entities/org-user-asset.entity';
import { OrgAssetMapEfTgo } from '../entities/org-asset-map-ef-tgo.entity';
import { OrgEmission } from '../entities/org-emission.entity';
import { OrgEmissionCalculate } from '../entities/org-emission-calculate.entity';
import { OrgEmissionEvidence } from '../entities/org-emission-evidence.entity';
import { AdminFormular } from '../entities/admin-formular.entity';
import { Calculate } from '../entities/calculate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StdScope,
      StdFactorGroup,
      StdFactorSubgroup,
      StdFactorCommon,
      StdEfTgo,
      StdFuelType,
      StdFuelBrand,
      StdFuelMapEf,
      OrgAsset,
      OrgUserBranch,
      OrgUserAsset,
      OrgAssetMapEfTgo,
      OrgEmission,
      OrgEmissionCalculate,
      OrgEmissionEvidence,
      AdminFormular,
      Calculate,
    ]),
  ],
  providers: [CfoService],
  controllers: [CfoController],
  exports: [CfoService],
})
export class CfoModule {}
