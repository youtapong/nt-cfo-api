import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('org_branch', { schema: 'public' })
@Unique('uq_org_branch_branch_name', ['branchName'])
export class OrgBranch {
  @PrimaryGeneratedColumn({ name: 'branch_id' })
  branchId: number;

  @Column({ type: 'integer', name: 'company_id', nullable: true })
  companyId: number;

  @Column({ type: 'varchar', length: 50, name: 'branch_code', nullable: true })
  branchCode: string;

  @Column({ type: 'varchar', length: 50, name: 'branch_name', nullable: true })
  branchName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  building: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  province: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  district: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  tumbol: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  postcode: string;

  @Column({ type: 'integer', nullable: true })
  staff: number;

  @Column({ type: 'integer', name: 'work_year', nullable: true })
  workYear: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  gps: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 50, default: 'branch.png' })
  image: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  remark: string;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
