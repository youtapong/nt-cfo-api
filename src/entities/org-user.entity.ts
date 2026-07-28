import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('org_user', { schema: 'public' })
export class OrgUser {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 64, nullable: true, select: false }) // Hide password by default
  password: string;

  @Column({ type: 'varchar', length: 50, default: 'user' })
  role: string;

  @Column({ type: 'varchar', length: 100, name: 'job_position', nullable: true })
  jobPosition: string;

  @Column({ type: 'integer', default: 1 })
  enable: number;

  @Column({ type: 'varchar', length: 64, name: 'file_name', nullable: true })
  fileName: string;

  @Column({ type: 'varchar', length: 64, name: 'file_path', nullable: true })
  filePath: string;

  @Column({ type: 'varchar', length: 50, default: 'user.png' })
  firstname: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastname: string;

  @Column({ type: 'varchar', length: 10, default: 'active' })
  status: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 50, name: 'id_card', nullable: true })
  idCard: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 11, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  note: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  token: string;

  @Column({ type: 'timestamp', name: 'update_date', nullable: true })
  updateDate: Date;

  @Column({ type: 'integer', name: 'update_by', nullable: true })
  updateBy: number;

  @Column({ type: 'timestamp', name: 'create_date', nullable: true })
  createDate: Date;

  @Column({ type: 'varchar', length: 50, name: 'create_by', nullable: true })
  createBy: string;

  @Column({ type: 'integer', name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
