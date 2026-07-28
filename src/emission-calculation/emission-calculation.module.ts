import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmissionCalculationService } from './emission-calculation.service';
import { EmissionCalculationController } from './emission-calculation.controller';

// Import emission and calculation entities
import { OrgEmission } from '../entities/org-emission.entity';
import { OrgEmissionCalculate } from '../entities/org-emission-calculate.entity';
import { OrgEmissionEvidence } from '../entities/org-emission-evidence.entity';
import { AdminFormular } from '../entities/admin-formular.entity';
import { Calculate } from '../entities/calculate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrgEmission,
      OrgEmissionCalculate,
      OrgEmissionEvidence,
      AdminFormular,
      Calculate,
    ]),
  ],
  providers: [EmissionCalculationService],
  controllers: [EmissionCalculationController],
  exports: [EmissionCalculationService],
})
export class EmissionCalculationModule {}
