import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('std_fuel_brand', { schema: 'public' })
@Unique('uniq_fuel_type_brand', ['fuelTypeId', 'fuelBrand'])
export class StdFuelBrand {
  @PrimaryGeneratedColumn({ name: 'fuel_brand_id' })
  fuelBrandId: number;

  @Column({ type: 'integer', name: 'fuel_type_id', nullable: false })
  fuelTypeId: number;

  @Column({ type: 'varchar', length: 50, name: 'fuel_brand', nullable: true })
  fuelBrand: string;

  @Column({ type: 'varchar', length: 50, name: 'fuel_brand_th', nullable: true })
  fuelBrandTh: string;

  @Column({ type: 'timestamp with time zone', name: 'last_modified', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;
}
