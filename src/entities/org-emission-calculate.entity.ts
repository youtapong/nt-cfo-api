import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('org_emission_calculate', { schema: 'public' })
@Unique('chk_cal', ['actionDate', 'emissionId', 'efTgoId'])
export class OrgEmissionCalculate {
  @PrimaryGeneratedColumn({ name: 'cal_id' })
  calId: number;

  @Column({ type: 'date', name: 'action_date', nullable: true })
  actionDate: Date;

  @Column({ type: 'integer', name: 'emission_id', nullable: false })
  emissionId: number;

  @Column({ type: 'integer', name: 'asset_id', nullable: true })
  assetId: number;

  @Column({ type: 'integer', name: 'ef_tgo_id', nullable: false })
  efTgoId: number;

  @Column({ type: 'double precision', nullable: true })
  amount: number;

  @Column({ type: 'double precision', name: 'kg_co2_value', nullable: true })
  kgCO2Value: number;

  @Column({ type: 'double precision', name: 'kg_ch4_value', nullable: true })
  kgCH4Value: number;

  @Column({ type: 'double precision', name: 'kg_n2o_value', nullable: true })
  kgN2OValue: number;

  @Column({ type: 'double precision', name: 'kg_total_co2e_value', nullable: true })
  kgTotalCo2eValue: number;

  @Column({ type: 'integer', name: 'scope_id', nullable: true })
  scopeId: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  remark: string;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
