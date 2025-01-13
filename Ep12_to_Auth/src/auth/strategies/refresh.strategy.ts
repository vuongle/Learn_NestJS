import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ignoreElements } from 'rxjs';
import refreshJwtConfig from 'src/auth/config/refresh-jwt.config';
import { AuthJwtPayload } from 'src/auth/types/jwt.payload';

// this jwt strategy is used to extract the access token from the request header
// and check if it is valid.
@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtCfg: ConfigType<typeof refreshJwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refreshJwtCfg.secret,
      //ignoreExpiration: false,
    });
  }

  // JwtStrategy automatically extract the token from request header
  // convert it to AuthJwtPayload then pass it to this method
  validate(payload: AuthJwtPayload) {
    console.log('RefreshJwtStrategy:validate: ', payload);
    return { id: payload.sub };
  }
}
