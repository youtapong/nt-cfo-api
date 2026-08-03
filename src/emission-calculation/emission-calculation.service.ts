import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

// Import emission and calculation entities
import { OrgEmission } from '../entities/org-emission.entity';
import { OrgEmissionCalculate } from '../entities/org-emission-calculate.entity';
import { OrgEmissionEvidence } from '../entities/org-emission-evidence.entity';
import { AdminFormular } from '../admin/admin-formular.entity';
import { Calculate } from '../entities/calculate.entity';
import { StdEfTgo } from '../entities/std-ef-tgo.entity';
import { StdFactorGroup } from '../entities/std-factor-group.entity';
import { StdFactorSubgroup } from '../entities/std-factor-subgroup.entity';
import { StdFactorCommon } from '../entities/std-factor-common.entity';
import { StdFuelType } from '../entities/std-fuel-type.entity';

const ENTITY_MAP: Record<string, any> = {
  'org-emission': OrgEmission,
  'org-emission-calculate': OrgEmissionCalculate,
  'org-emission-evidence': OrgEmissionEvidence,
  'calculate': Calculate,
};

@Injectable()
export class EmissionCalculationService {
  constructor(private readonly dataSource: DataSource) {}

  private getRepository(entity: string) {
    const entityClass = ENTITY_MAP[entity.toLowerCase()];
    if (!entityClass) {
      throw new BadRequestException(
        `Entity '${entity}' is invalid for Emission & Calculation. Supported entities are: ${Object.keys(ENTITY_MAP).join(', ')}`
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

  async calculateCfo(amount: number, formularId: number): Promise<any> {
    if (amount === undefined || amount === null || amount <= 0) {
      return 0;
    }
    if (formularId === undefined || formularId === null) {
      return 0;
    }

    const adminFormularRepo = this.dataSource.getRepository(AdminFormular);
    const formular = await adminFormularRepo.findOne({ where: { formularId: formularId } });
    if (!formular) {
      return 0;
    }

    const stdEfTgoRepo = this.dataSource.getRepository(StdEfTgo);
    const dataArray: Record<string, any> = {};
    let totalCo2e = 0;

    const tgos = [
      { id: formular.stdEfTgo1, percent: formular.efTgoPercent1, reportType: formular.reportType1, key: 'ef_tgo1' },
      { id: formular.stdEfTgo2, percent: formular.efTgoPercent2, reportType: formular.reportType2, key: 'ef_tgo2' },
      { id: formular.stdEfTgo3, percent: formular.efTgoPercent3, reportType: formular.reportType3, key: 'ef_tgo3' },
      { id: formular.stdEfTgo4, percent: formular.efTgoPercent4, reportType: formular.reportType4, key: 'ef_tgo4' },
      { id: formular.stdEfTgo5, percent: formular.efTgoPercent5, reportType: formular.reportType5, key: 'ef_tgo5' },
    ];

    for (const tgo of tgos) {
      if (tgo.id && tgo.id !== 0) {
        const row = await stdEfTgoRepo.findOne({ where: { efTgoId: tgo.id } });
        if (row) {
          const kg_CO2 = row.kgCo2 ?? 0;
          const kg_CH4 = row.kgCh4 ?? 0;
          const kg_N2O = row.kgN2o ?? 0;
          const kg_Total_co2e = row.kgTotalCo2e ?? 0;
          totalCo2e += kg_Total_co2e;

          const sum_kg_CO2 = ((kg_CO2 * amount) * tgo.percent) / 100;
          const sum_kg_CH4 = ((kg_CH4 * amount) * tgo.percent) / 100;
          const sum_kg_N2O = ((kg_N2O * amount) * tgo.percent) / 100;
          const sum_kg_Total_co2e = ((kg_Total_co2e * amount) * tgo.percent) / 100;
          
          dataArray[tgo.key] = {
            ef_tgo_id: tgo.id,
            sum_kg_CO2,
            sum_kg_CH4,
            sum_kg_N2O,
            sum_kg_Total_co2e,
            scope: tgo.reportType,
          };
        }
      }
    }

    dataArray['Total_co2e5'] = totalCo2e;
    return dataArray;
  }

  async calculateCfoDetail(amount: number, formularId: number): Promise<any> {
    if (amount === undefined || amount === null || amount <= 0) {
      return 0;
    }
    if (formularId === undefined || formularId === null) {
      return 0;
    }

    const adminFormularRepo = this.dataSource.getRepository(AdminFormular);
    const formular = await adminFormularRepo.findOne({ where: { formularId: formularId } });
    if (!formular) {
      return 0;
    }

    const stdEfTgoRepo = this.dataSource.getRepository(StdEfTgo);
    const dataArray: Record<string, any> = {};
    let totalCo2e = 0;

    const tgos = [
      { id: formular.stdEfTgo1, percent: formular.efTgoPercent1, reportType: formular.reportType1, key: 'ef_tgo1' },
      { id: formular.stdEfTgo2, percent: formular.efTgoPercent2, reportType: formular.reportType2, key: 'ef_tgo2' },
      { id: formular.stdEfTgo3, percent: formular.efTgoPercent3, reportType: formular.reportType3, key: 'ef_tgo3' },
      { id: formular.stdEfTgo4, percent: formular.efTgoPercent4, reportType: formular.reportType4, key: 'ef_tgo4' },
      { id: formular.stdEfTgo5, percent: formular.efTgoPercent5, reportType: formular.reportType5, key: 'ef_tgo5' },
    ];

    for (const tgo of tgos) {
      if (tgo.id && tgo.id !== 0) {
        const row = await stdEfTgoRepo.findOne({ where: { efTgoId: tgo.id } });
        if (row) {
          const kg_CO2 = row.kgCo2 ?? 0;
          const kg_CH4 = row.kgCh4 ?? 0;
          const kg_N2O = row.kgN2o ?? 0;
          const kg_Total_co2e = row.kgTotalCo2e ?? 0;
          totalCo2e += kg_Total_co2e;

          const sum_kg_CO2 = ((kg_CO2 * amount) * tgo.percent) / 100;
          const sum_kg_CH4 = ((kg_CH4 * amount) * tgo.percent) / 100;
          const sum_kg_N2O = ((kg_N2O * amount) * tgo.percent) / 100;
          const sum_kg_Total_co2e = ((kg_Total_co2e * amount) * tgo.percent) / 100;
          
          dataArray[tgo.key] = {
            ef_tgo_id: tgo.id,
            sum_kg_CO2,
            sum_kg_CH4,
            sum_kg_N2O,
            sum_kg_Total_co2e,
            scope: tgo.reportType,
          };
        }
      }
    }

    dataArray['Total_co2e5'] = totalCo2e;

    // Fetch detail relations
    const factorGroupRepo = this.dataSource.getRepository(StdFactorGroup);
    const factorSubgroupRepo = this.dataSource.getRepository(StdFactorSubgroup);
    const factorCommonRepo = this.dataSource.getRepository(StdFactorCommon);
    const fuelTypeRepo = this.dataSource.getRepository(StdFuelType);

    let factorGroup: StdFactorGroup | null = null;
    if (formular.factorGroupId) {
      factorGroup = await factorGroupRepo.findOne({ where: { factorGroupId: formular.factorGroupId } });
      if (factorGroup) {
        delete (factorGroup as any).lastModified;
      }
    }

    let factorSubgroup: StdFactorSubgroup | null = null;
    if (formular.factorSubgroupId) {
      factorSubgroup = await factorSubgroupRepo.findOne({ where: { factorSubgroupId: formular.factorSubgroupId } });
      if (factorSubgroup) {
        delete (factorSubgroup as any).lastModified;
      }
    }

    let factorCommon: StdFactorCommon | null = null;
    if (formular.factorCommonId) {
      factorCommon = await factorCommonRepo.findOne({ where: { factorCommonId: formular.factorCommonId } });
      if (factorCommon) {
        delete (factorCommon as any).lastModified;
      }
    }

    let fuelType: StdFuelType | null = null;
    if (formular.fuelTypeId) {
      fuelType = await fuelTypeRepo.findOne({ where: { fuelTypeId: formular.fuelTypeId } });
    } else if (formular.fuelType) {
      fuelType = await fuelTypeRepo.findOne({ where: { fuelType: formular.fuelType } });
    }
    if (fuelType) {
      delete (fuelType as any).lastModified;
    }

    dataArray['factor_group'] = factorGroup;
    dataArray['factor_subgroup'] = factorSubgroup;
    dataArray['factor_common'] = factorCommon;
    dataArray['fuel_type'] = fuelType;

    // Fetch std_ef_tgo details
    const stdEfTgoKeys = ['stdEfTgo1', 'stdEfTgo2', 'stdEfTgo3', 'stdEfTgo4'] as const;
    for (const key of stdEfTgoKeys) {
      const tgoId = formular[key];
      const jsonKey = key === 'stdEfTgo1' ? 'std_ef_tgo1' :
                      key === 'stdEfTgo2' ? 'std_ef_tgo2' :
                      key === 'stdEfTgo3' ? 'std_ef_tgo3' : 'std_ef_tgo4';
      if (tgoId && tgoId !== 0) {
        const tgoDetail = await stdEfTgoRepo.findOne({ where: { efTgoId: tgoId } });
        if (tgoDetail) {
          delete (tgoDetail as any).lastModified;
          dataArray[jsonKey] = tgoDetail;
        } else {
          dataArray[jsonKey] = null;
        }
      } else {
        dataArray[jsonKey] = null;
      }
    }

    return dataArray;
  }
}
