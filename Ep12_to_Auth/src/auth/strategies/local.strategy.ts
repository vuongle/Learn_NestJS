import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // use usernameField because use email as the user name
    });
  }

  // PassportStrategy automatically extract email and password from request body
  // and pass it to this method
  validate(email: string, password: string) {
    console.log('LocalStrategy.validate');
    return this.authService.validateUser(email, password);
  }
}
