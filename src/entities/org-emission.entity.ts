import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('org_emission', { schema: 'public' })
export class OrgEmission {
  @PrimaryGeneratedColumn({ name: 'emission_id' })
  emissionId: number;

  @Column({ type: 'date', name: 'action_date', nullable: true })
  actionDate: Date;

  @Column({ type: 'integer', name: 'asset_id', nullable: true })
  assetId: number;

  @Column({ type: 'integer', name: 'user_id', nullable: true })
  userId: number;

  @Column({ type: 'integer', name: 'formular_id', nullable: true })
  formularId: number;

  @Column({ type: 'integer', name: 'factor_group_id', nullable: false })
  factorGroupId: number;

  @Column({ type: 'integer', name: 'factor_common_id', nullable: true })
  factorCommonId: number;

  @Column({ type: 'integer', name: 'factor_subgroup_id', nullable: true })
  factorSubgroupId: number;

  @Column({ type: 'integer', name: 'fuel_type_id', nullable: true })
  fuelTypeId: number;

  @Column({ type: 'varchar', length: 50, name: 'fuel_type', nullable: true })
  fuelType: string;

  @Column({ type: 'double precision', nullable: true })
  amount: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  remark: string;

  @Column({ type: 'timestamp', name: 'create_date', nullable: true })
  createDate: Date;

  @Column({ type: 'integer', name: 'create_by', nullable: true })
  createBy: number;

  @Column({ type: 'timestamp', name: 'update_date', nullable: true })
  updateDate: Date;

  @Column({ type: 'integer', name: 'update_by', nullable: true })
  updateBy: number;

  @Column({ type: 'varchar', length: 2, default: 'dr' })
  approval: string;

  @Column({ type: 'timestamp', name: 'approval_date', nullable: true })
  approvalDate: Date;

  @Column({ type: 'integer', name: 'approval_by', nullable: true })
  approvalBy: number;

  @Column({ type: 'varchar', length: 5, name: 'laste_action', default: 'dr' })
  lasteAction: string;

  @Column({ type: 'timestamp', name: 'laste_action_date', nullable: true })
  lasteActionDate: Date;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
