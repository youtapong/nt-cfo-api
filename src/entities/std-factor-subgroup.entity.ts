import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('std_factor_subgroup', { schema: 'public' })
export class StdFactorSubgroup {
  @PrimaryGeneratedColumn({ name: 'factor_subgroup_id' })
  factorSubgroupId: number;

  @Column({ type: 'varchar', length: 60, name: 'factor_subgroup_eng', nullable: true })
  factorSubgroupEng: string;

  @Column({ type: 'varchar', length: 60, name: 'factor_subgroup_th', nullable: true })
  factorSubgroupTh: string;

  @Column({ type: 'integer', name: 'factor_common_id', nullable: true })
  factorCommonId: number;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
