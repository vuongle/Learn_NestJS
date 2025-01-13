import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from 'src/auth/guards/refresh-auth/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard) // use a custom guard instead of AuthGuard
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return this.authService.login(req.user.id);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshAuthGuard)
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user.id);
  }
}
