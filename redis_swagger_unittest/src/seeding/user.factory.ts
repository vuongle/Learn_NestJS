/* eslint-disable @typescript-eslint/no-unused-vars */
import { Faker, faker } from '@faker-js/faker';
import { User } from '../entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';

export const UserFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName('female');
  user.email = faker.internet.email();
  user.avatarUrl = faker.image.avatar();
  user.password = faker.internet.password();

  return user;
});
