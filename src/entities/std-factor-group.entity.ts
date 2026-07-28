import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('std_factor_group', { schema: 'public' })
export class StdFactorGroup {
  @PrimaryGeneratedColumn({ name: 'factor_group_id' })
  factorGroupId: number;

  @Column({ type: 'varchar', length: 50, name: 'factor_group_eng', nullable: true })
  factorGroupEng: string;

  @Column({ type: 'varchar', length: 50, name: 'factor_group_th', nullable: true })
  factorGroupTh: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  desc: string;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
