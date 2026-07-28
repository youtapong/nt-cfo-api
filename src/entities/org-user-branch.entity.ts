import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('org_user_branch', { schema: 'public' })
@Unique('uq_user_branch', ['userId', 'branchId'])
export class OrgUserBranch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', name: 'user_id', nullable: true })
  userId: number;

  @Column({ type: 'integer', name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  remark: string;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
