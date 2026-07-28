import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('std_scope', { schema: 'public' })
export class StdScope {
  @PrimaryGeneratedColumn({ name: 'scope_id' })
  scopeId: number;

  @Column({ type: 'varchar', length: 50, name: 'scope_eng', nullable: true })
  scopeEng: string;

  @Column({ type: 'varchar', length: 64, name: 'scope_th', nullable: true })
  scopeTh: string;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
