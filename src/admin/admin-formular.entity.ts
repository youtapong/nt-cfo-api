import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('admin_formular', { schema: 'public' })
@Unique('uniqe_key', ['key'])
export class AdminFormular {
  @PrimaryGeneratedColumn({ name: 'formular_id' })
  formularId: number;

  @Column({ type: 'integer', name: 'factor_group_id', nullable: false })
  factorGroupId: number;

  @Column({ type: 'integer', name: 'factor_common_id', nullable: true })
  factorCommonId: number;

  @Column({ type: 'integer', name: 'factor_subgroup_id', nullable: true })
  factorSubgroupId: number;

  @Column({ type: 'varchar', length: 50, name: 'user_id', nullable: true })
  userId: string;

  @Column({ type: 'integer', name: 'fuel_type_id', nullable: true })
  fuelTypeId: number;

  @Column({ type: 'varchar', length: 50, name: 'fuel_type', nullable: true })
  fuelType: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  key: string;

  @Column({ type: 'integer', name: 'std_ef_tgo1', default: 0 })
  stdEfTgo1: number;

  @Column({ type: 'integer', name: 'ef_tgo_percent1', default: 0 })
  efTgoPercent1: number;

  @Column({ type: 'varchar', length: 3, name: 'report_type1', nullable: true })
  reportType1: string;

  @Column({ type: 'integer', name: 'std_ef_tgo2', default: 0 })
  stdEfTgo2: number;

  @Column({ type: 'integer', name: 'ef_tgo_percent2', default: 0 })
  efTgoPercent2: number;

  @Column({ type: 'varchar', length: 3, name: 'report_type2', nullable: true })
  reportType2: string;

  @Column({ type: 'integer', name: 'std_ef_tgo3', default: 0 })
  stdEfTgo3: number;

  @Column({ type: 'integer', name: 'ef_tgo_percent3', default: 0 })
  efTgoPercent3: number;

  @Column({ type: 'varchar', length: 3, name: 'report_type3', nullable: true })
  reportType3: string;

  @Column({ type: 'integer', name: 'std_ef_tgo4', default: 0 })
  stdEfTgo4: number;

  @Column({ type: 'integer', name: 'ef_tgo_percent4', default: 0 })
  efTgoPercent4: number;

  @Column({ type: 'varchar', length: 3, name: 'report_type4', nullable: true })
  reportType4: string;

  @Column({ type: 'integer', name: 'std_ef_tgo5', default: 0 })
  stdEfTgo5: number;

  @Column({ type: 'integer', name: 'ef_tgo_percent5', default: 0 })
  efTgoPercent5: number;

  @Column({ type: 'varchar', length: 3, name: 'report_type5', nullable: true })
  reportType5: string;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
