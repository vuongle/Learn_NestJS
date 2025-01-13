import { PropertyFeature } from './propertyFeature.entity';
import { PropertyType } from './propertyType.entity';
import { User } from './user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  // JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//
// Relationships with the Property entity:
// Property - PropertyFeature: One to One
// Property - User: Many to One
// Property - user_liked_properties: Many to Many
//

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  price: number;

  @OneToOne(
    () => PropertyFeature, // 1st param specifis the target relation to PropertyFeature
    (propertyFeature) => propertyFeature.property, // inverse side as a second parameter
    {
      cascade: true,
    },
  )
  propertyFeature: PropertyFeature;

  @ManyToOne(() => User, (user) => user.properties)
  //@JoinColumn({ name: 'ownerId' }) // change field name of the foreign key in db
  user: User;

  @ManyToMany(() => User, (user) => user.likedProperties)
  likedBy: User[];

  @ManyToOne(() => PropertyType)
  type: PropertyType;
}
