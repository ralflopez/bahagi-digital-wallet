import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/users/enums/role.enum';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuardInjectable implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || !requiredRoles[0] || requiredRoles.length < 1) {
      return true;
    }

    const request = context.getArgByIndex(2).req;

    return requiredRoles.some((role) => request?.session?.user?.role === role);
  }
}

export function AuthorizationGuard() {
  return UseGuards(RolesGuardInjectable);
}
