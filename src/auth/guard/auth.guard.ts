import { Injectable, CanActivate } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContextHost,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('guard');
    const request = context.getArgByIndex(2).req;
    return Boolean(request?.session?.user?.id);
  }
}
