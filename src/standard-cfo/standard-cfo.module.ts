import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StandardCfoService } from './standard-cfo.service';
import { StandardCfoController } from './standard-cfo.controller';

// Import standard entities
import { StdScope } from '../entities/std-scope.entity';
import { StdFactorGroup } from '../entities/std-factor-group.entity';
import { StdFactorSubgroup } from '../entities/std-factor-subgroup.entity';
import { StdFactorCommon } from '../entities/std-factor-common.entity';
import { StdEfTgo } from '../entities/std-ef-tgo.entity';
import { StdFuelType } from '../entities/std-fuel-type.entity';
import { StdFuelBrand } from '../entities/std-fuel-brand.entity';
import { StdFuelMapEf } from '../entities/std-fuel-map-ef.entity';

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
    ]),
  ],
  providers: [StandardCfoService],
  controllers: [StandardCfoController],
  exports: [StandardCfoService],
})
export class StandardCfoModule {}
