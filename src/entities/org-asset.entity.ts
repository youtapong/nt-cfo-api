import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('org_asset', { schema: 'public' })
@Unique('uq_org_asset_asset_name', ['assetName'])
export class OrgAsset {
  @PrimaryGeneratedColumn({ name: 'asset_id' })
  assetId: number;

  @Column({ type: 'varchar', length: 128, name: 'asset_name', nullable: true })
  assetName: string;

  @Column({ type: 'integer', name: 'factor_common_id', nullable: true })
  factorCommonId: number;

  @Column({ type: 'integer', name: 'factor_group_id', nullable: true })
  factorGroupId: number;

  @Column({ type: 'integer', name: 'scope_id', nullable: true })
  scopeId: number;

  @Column({ type: 'varchar', length: 1024, name: 'asset_desc', nullable: true })
  assetDesc: string;

  @Column({ type: 'integer', name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ type: 'varchar', length: 256, name: 'asset_img', nullable: true })
  assetImg: string;

  @Column({ type: 'varchar', length: 256, name: 'asset_file', nullable: true })
  assetFile: string;

  @Column({ type: 'integer', default: 1 })
  status: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  key: string;

  @Column({ type: 'integer', name: 'formular_id', nullable: true })
  formularId: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  remark: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  unit: string;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
