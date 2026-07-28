import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('org_user_asset', { schema: 'public' })
@Unique('uq_user_asset', ['userId', 'assetId'])
export class OrgUserAsset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', name: 'user_id', nullable: true })
  userId: number;

  @Column({ type: 'integer', name: 'asset_id', nullable: true })
  assetId: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  remark: string;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
