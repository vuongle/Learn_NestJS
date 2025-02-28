import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshAuthGuard extends AuthGuard('refresh-jwt') {} // 'refresh-jwt': is the name of the strategy defined in refresh.strategy.ts
