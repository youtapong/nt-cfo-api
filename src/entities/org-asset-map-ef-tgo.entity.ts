import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('org_asset_map_ef_tgo', { schema: 'public' })
@Unique('uq_asset_ef_tgo', ['assetId', 'efTgoId'])
export class OrgAssetMapEfTgo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', name: 'asset_id', nullable: false })
  assetId: number;

  @Column({ type: 'integer', name: 'ef_tgo_id', nullable: false })
  efTgoId: number;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
