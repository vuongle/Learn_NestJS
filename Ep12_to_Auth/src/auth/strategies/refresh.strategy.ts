import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';
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
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refreshJwtCfg.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  // JwtStrategy automatically extract the token from request header
  // convert it to AuthJwtPayload then pass it to this method
  validate(req: Request, payload: AuthJwtPayload) {
    //console.log('RefreshJwtStrategy:payload: ', payload);

    // get non-hashed refresh token from client
    const refreshToken = req.get('authorization').replace('Bearer ', '').trim();
    //console.log('RefreshJwtStrategy:refreshToken: ', refreshToken);
    const userId = payload.sub;

    return this.authService.validateRefreshToken(userId, refreshToken);
  }
}
