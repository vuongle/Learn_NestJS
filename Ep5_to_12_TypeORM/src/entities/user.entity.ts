import { Property } from './property.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

//
// Relationships with the User entity:
// User - Property: One to Many
// User - user_liked_properties: Many to Many
//

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  avatarUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Property, (property) => property.user)
  properties: Property[];

  @ManyToMany(() => Property, (property) => property.likedBy)
  @JoinTable({ name: 'user_liked_properties' }) // @JoinTable() is required for @ManyToMany relations. You must put @JoinTable on one (owning) side of relation.
  likedProperties: Property[];
}
