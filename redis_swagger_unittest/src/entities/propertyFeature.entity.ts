import { Property } from './property.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//
// Relationships with the PropertyFeature entity:
// PropertyFeature - Property: One to One
//

@Entity()
export class PropertyFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bedRooms: number;

  @Column()
  bathRooms: number;

  @Column()
  parkingSpots: number;

  @Column()
  area: number;

  @Column()
  hasBalcony: boolean;

  @Column()
  hasGardenYard: boolean;

  @Column()
  hasSwimmingPool: boolean;

  @OneToOne(() => Property, (property) => property.propertyFeature) // inverse side as a second parameter
  @JoinColumn() //@JoinColumn must only be on one side of the relation - on the table that will own the foreign key.
  property: Property;
}
