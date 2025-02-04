import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  // inject Reflector to extract role in method metadata
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(), // getHandler() is higher than getClass() because it is before the class
      context.getClass(),
    ]);
    console.log(requiredRoles);

    const user = context.switchToHttp().getRequest().user;
    console.log(user);
    const hasRequiredRole = requiredRoles.some((role) => user.role === role);

    return hasRequiredRole;
  }
}
