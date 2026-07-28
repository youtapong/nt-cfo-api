import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('org_emission_evidence', { schema: 'public' })
@Unique('uq_emission_file_name', ['emissionId', 'fileName'])
export class OrgEmissionEvidence {
  @PrimaryGeneratedColumn({ name: 'evidence_id' })
  evidenceId: number;

  @Column({ type: 'integer', name: 'emission_id', nullable: false })
  emissionId: number;

  @Column({ type: 'varchar', length: 100, name: 'file_name', nullable: false })
  fileName: string;

  @Column({ type: 'date', name: 'action_date', nullable: true })
  actionDate: Date;

  @Column({ type: 'varchar', length: 100, name: 'url_path', nullable: true })
  urlPath: string;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
