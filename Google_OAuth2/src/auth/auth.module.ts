import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import refreshJwtConfig from 'src/auth/config/refresh-jwt.config';
import { RefreshJwtStrategy } from 'src/auth/strategies/refresh.strategy';
import googleOauthConfig from './config/google-oauth.config';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // this is the way to register user repository in auth module
    //JwtModule.registerAsync(jwtConfig.asProvider()),
    //ConfigModule.forFeature(jwtConfig),
    //ConfigModule.forFeature(refreshJwtConfig),
    ConfigModule.forFeature(googleOauthConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    //LocalStrategy,
    //JwtStrategy,
    //RefreshJwtStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
