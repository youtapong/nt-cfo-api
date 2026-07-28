import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('org_company', { schema: 'public' })
export class OrgCompany {
  @PrimaryGeneratedColumn({ name: 'company_id' })
  companyId: number;

  @Column({ type: 'varchar', length: 50, name: 'company_name_th', nullable: true })
  companyNameTh: string;

  @Column({ type: 'varchar', length: 50, name: 'company_name_en', nullable: true })
  companyNameEn: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  address: string;

  @Column({ type: 'integer', name: 'calculate_type', default: 1 })
  calculateType: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  gps: string;

  @Column({ type: 'varchar', length: 128, default: 'company.png' })
  image: string;

  @Column({ type: 'varchar', length: 128, default: 'file.pdf' })
  file: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  remark: string;

  @Column({ type: 'timestamp', name: 'update_date', nullable: true })
  updateDate: Date;

  @Column({ type: 'varchar', length: 100, name: 'update_by', nullable: true })
  updateBy: string;

  @Column({ type: 'timestamp', name: 'create_date', nullable: true })
  createDate: Date;

  @Column({ type: 'varchar', length: 100, name: 'create_by', nullable: true })
  createBy: string;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
