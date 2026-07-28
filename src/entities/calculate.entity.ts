import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('calculate', { schema: 'public' })
export class Calculate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', name: 'cal_id', nullable: false })
  calId: number;

  @Column({ type: 'date', name: 'action_date', nullable: true })
  actionDate: Date;

  @Column({ type: 'integer', name: 'provincecode', nullable: false })
  provinceCode: number;

  @Column({ type: 'integer', name: 'brach_id', nullable: true })
  branchId: number;

  @Column({ type: 'integer', name: 'admin_formular_id', nullable: false })
  adminFormularId: number;

  @Column({ type: 'integer', name: 'factor_group_id', nullable: false })
  factorGroupId: number;

  @Column({ type: 'varchar', length: 128, name: 'asset_name', nullable: true })
  assetName: string;

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
