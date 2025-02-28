import { Property } from './property.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/enums/role.enum';

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

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  avatarUrl: string;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Property, (property) => property.user)
  properties: Property[];

  @ManyToMany(() => Property, (property) => property.likedBy)
  @JoinTable({ name: 'user_liked_properties' }) // @JoinTable() is required for @ManyToMany relations. You must put @JoinTable on one (owning) side of relation.
  likedProperties: Property[];

  // An example of using a trigger
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10); // 10 is the salt. The higher the number, the more secure, but the slower
  }
}
