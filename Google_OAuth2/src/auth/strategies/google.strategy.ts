import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleOauthConfig from '../config/google-oauth.config';

// this jwt strategy is used to extract the access token from the request header
// and check if it is valid.
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private oauthCfg: ConfigType<typeof googleOauthConfig>,
  ) {
    super({
      clientID: oauthCfg.clientID,
      clientSecret: oauthCfg.clientSecret,
      callbackURL: oauthCfg.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  // JwtStrategy automatically extract the token from request header
  // convert it to AuthJwtPayload then pass it to this method
  asyncvalidate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    done: VerifyCallback,
  ) {
    console.log('GoogleStrategy:validate: ', profile);
  }
}
