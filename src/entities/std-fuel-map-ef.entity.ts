import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('std_fuel_map_ef', { schema: 'public' })
@Unique('uniq_fuel_type_ef_tgo', ['fuelTypeId', 'efTgoId'])
export class StdFuelMapEf {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', name: 'fuel_type_id', nullable: true })
  fuelTypeId: number;

  @Column({ type: 'integer', name: 'ef_tgo_id', nullable: true })
  efTgoId: number;

  @Column({ type: 'integer', nullable: true })
  percentage: number;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
