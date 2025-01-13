import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import refreshJwtConfig from 'src/auth/config/refresh-jwt.config';
import { AuthJwtPayload } from 'src/auth/types/jwt.payload';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtCfg: ConfigType<typeof refreshJwtConfig>, // inject config object by using @Inject()
  ) {}
  async validateUser(email: string, password: string) {
    console.log('AuthService.validateUser');
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

  login(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, this.refreshJwtCfg);
    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  refreshToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const accessToken = this.jwtService.sign(payload);
    return {
      id: userId,
      accessToken,
    };
  }
}
