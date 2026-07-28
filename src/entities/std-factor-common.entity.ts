import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('std_factor_common', { schema: 'public' })
export class StdFactorCommon {
  @PrimaryGeneratedColumn({ name: 'factor_common_id' })
  factorCommonId: number;

  @Column({ type: 'varchar', length: 50, name: 'factor_common_eng', nullable: true })
  factorCommonEng: string;

  @Column({ type: 'varchar', length: 50, name: 'factor_common_th', nullable: true })
  factorCommonTh: string;

  @Column({ type: 'varchar', length: 512, name: 'factor_desc', nullable: true })
  factorDesc: string;

  @Column({ type: 'smallint', default: 1 })
  status: number;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
