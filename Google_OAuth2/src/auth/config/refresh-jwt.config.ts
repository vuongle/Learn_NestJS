import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

// Registers the configuration object with nest config module
export default registerAs(
  'refresh-jwt', // this namespace is used to inject this config object in other modules
  (): JwtSignOptions => ({
    secret: process.env.REFRESH_JWT_SECRET,
    expiresIn: process.env.REFRESH_JWT_EXPIRE_IN,
  }),
);
