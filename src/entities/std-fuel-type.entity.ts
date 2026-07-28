import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('std_fuel_type', { schema: 'public' })
@Unique('uniq_factor_fuel_sub', ['factorType', 'fuelType', 'fuelSub'])
export class StdFuelType {
  @PrimaryGeneratedColumn({ name: 'fuel_type_id' })
  fuelTypeId: number;

  @Column({ type: 'varchar', length: 50, name: 'factor_type', nullable: true })
  factorType: string;

  @Column({ type: 'varchar', length: 50, name: 'fuel_type', nullable: true })
  fuelType: string;

  @Column({ type: 'varchar', length: 50, name: 'fuel_sub', nullable: true })
  fuelSub: string;

  @Column({ type: 'varchar', length: 50, name: 'fuel_desc', nullable: true })
  fuelDesc: string;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
