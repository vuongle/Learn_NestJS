import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';

/**
 * A factory function returning an instance of PostgresConnectionOptions
 * @returns {PostgresConnectionOptions} an instance of PostgresConnectionOptions
 */
export default (): PostgresConnectionOptions => ({
  url: process.env.DB_URL,
  type: 'postgres',
  port: +process.env.DB_PORT, // "+" convert string to number
  //entities: [Property], // register entities manually, this way is not good when there are many entities
  entities: [path.resolve(__dirname, '..') + '/**/*.entity.{js,ts}'], // register entities automatically
  synchronize: false, // do not use "true" in production
});
