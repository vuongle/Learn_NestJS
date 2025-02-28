import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

// Registers the configuration object with nest config module
export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRE_IN,
    },
  }),
);
