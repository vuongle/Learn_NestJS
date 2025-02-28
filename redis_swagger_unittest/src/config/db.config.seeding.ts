import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';

/**
 * A factory function returning an instance of PostgresConnectionOptions
 * @returns {PostgresConnectionOptions} an instance of PostgresConnectionOptions
 */
export default (): PostgresConnectionOptions => ({
  url: 'postgresql://lamadev:lama123456@localhost:5432/nestjs_realestate',
  type: 'postgres',
  port: 5432, // "+" convert string to number
  //entities: [Property], // register entities manually, this way is not good when there are many entities
  entities: [path.resolve(__dirname, '..') + '/**/*.entity.{js,ts}'], // register entities automatically
  synchronize: true, // do not use "true" in production
});
