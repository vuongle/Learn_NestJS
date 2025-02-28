import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    // must create user from dto first because the user entity has @BeforeInsert
    // if using save() without create(), the password will not be hashed
    const user = this.userRepo.create(createUserDto);

    return await this.userRepo.save(user);
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return await this.userRepo.findOne({
      where: { id },
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'avatarUrl',
        'hashedRefreshToken',
        'role',
      ],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async updateHashedRefreshToken(id: number, hashedRefreshToken: string) {
    return await this.userRepo.update({ id }, { hashedRefreshToken });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
