import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from 'src/auth/guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // use a custom guard instead of AuthGuard
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req) {
    return this.authService.login(req.user.id);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req) {
    await this.authService.logout(req.user.id);

    return {
      message: 'Logout successfully',
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshAuthGuard)
  async refreshToken(@Req() req) {
    return await this.authService.refreshToken(req.user.id);
  }
}
