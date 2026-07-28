import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('std_ef_tgo', { schema: 'public' })
export class StdEfTgo {
  @PrimaryGeneratedColumn({ name: 'ef_tgo_id' })
  efTgoId: number;

  @Column({ type: 'integer', name: 'scope_id', nullable: true })
  scopeId: number;

  @Column({ type: 'integer', name: 'factor_group_id', nullable: true })
  factorGroupId: number;

  @Column({ type: 'integer', name: 'factor_subgroup_id', nullable: true })
  factorSubgroupId: number;

  @Column({ type: 'integer', name: 'factor_type_id', nullable: true })
  factorTypeId: number;

  @Column({ type: 'varchar', length: 128, name: 'factor_type_eng', nullable: true })
  factorTypeEng: string;

  @Column({ type: 'integer', name: 'factor_common_id', nullable: true })
  factorCommonId: number;

  @Column({ type: 'varchar', length: 128, name: 'factor_type_th', nullable: true })
  factorTypeTh: string;

  @Column({ type: 'varchar', length: 50, name: 'description_eng', nullable: true })
  descriptionEng: string;

  @Column({ type: 'varchar', length: 256, name: 'description_th', nullable: true })
  descriptionTh: string;

  @Column({ type: 'varchar', length: 50, name: 'unit_eng', nullable: true })
  unitEng: string;

  @Column({ type: 'varchar', length: 50, name: 'unit_th', nullable: true })
  unitTh: string;

  @Column({ type: 'double precision', name: 'kg_co2', nullable: true })
  kgCo2: number;

  @Column({ type: 'double precision', name: 'kg_ch4', nullable: true })
  kgCh4: number;

  @Column({ type: 'double precision', name: 'kg_n2o', nullable: true })
  kgN2o: number;

  @Column({ type: 'double precision', name: 'kg_total_co2e', nullable: true })
  kgTotalCo2e: number;

  @Column({ type: 'varchar', length: 128, nullable: true })
  reference: string;

  @Column({ type: 'varchar', length: 50, name: 'remark_1', nullable: true })
  remark1: string;

  @Column({ type: 'varchar', length: 50, name: 'remark_2', nullable: true })
  remark2: string;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
