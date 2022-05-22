import { Injectable, CanActivate, UseGuards } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardInjectable implements CanActivate {
  canActivate(
    context: ExecutionContextHost,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.getArgByIndex(2).req;
    return Boolean(request?.session?.user?.id);
  }
}

export function AuthGuard() {
  return UseGuards(AuthGuardInjectable);
}
