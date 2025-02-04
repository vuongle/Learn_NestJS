import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import refreshJwtConfig from 'src/auth/config/refresh-jwt.config';
import { AuthJwtPayload } from 'src/auth/types/jwt.payload';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { CurrentUser } from 'src/auth/types/current-user';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtCfg: ConfigType<typeof refreshJwtConfig>, // inject config object by using @Inject()
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordMatched = await compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      id: user.id,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const currentUser: CurrentUser = {
      id: user.id,
      role: user.role,
    };

    return currentUser;
  }

  async login(userId: number) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    // hash the refresh token by argon2 and save it
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);

    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: number) {
    await this.userService.updateHashedRefreshToken(userId, null);
  }

  async generateTokens(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshJwtCfg),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(userId: number) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    // hash the refresh token by argon2 and save it
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);

    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // verify
    const isRefreshTokenMatched = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!isRefreshTokenMatched) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return {
      id: userId,
    };
  }
}
