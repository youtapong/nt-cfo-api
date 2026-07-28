import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('org_building', { schema: 'public' })
@Unique('uq_org_building_name_branch', ['buildingName', 'branchId'])
export class OrgBuilding {
  @PrimaryGeneratedColumn({ name: 'building_id' })
  buildingId: number;

  @Column({ type: 'integer', name: 'company_id', nullable: true })
  companyId: number;

  @Column({ type: 'integer', name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ type: 'varchar', length: 50, name: 'building_name', nullable: true })
  buildingName: string;

  @Column({ type: 'integer', nullable: true })
  staff: number;

  @Column({ type: 'integer', name: 'work_year', nullable: true })
  workYear: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  gps: string;

  @Column({ type: 'varchar', length: 50, default: 'branch.png' })
  image: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  remark: string;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
