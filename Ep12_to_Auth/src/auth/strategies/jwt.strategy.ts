import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';
import jwtConfig from 'src/auth/config/jwt.config';
import { AuthJwtPayload } from 'src/auth/types/jwt.payload';

// this jwt strategy is used to extract the access token from the request header
// and check if it is valid.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtCfg: ConfigType<typeof jwtConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtCfg.secret,
      ignoreExpiration: false,
    });
  }

  // JwtStrategy automatically extract the token from request header
  // convert it to AuthJwtPayload then pass it to this method
  validate(payload: AuthJwtPayload) {
    const userId = payload.sub;

    return this.authService.validateJwtUser(userId);
  }
}
