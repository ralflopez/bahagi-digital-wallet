import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { User } from 'src/users/entities/user.entity';

export type IUserSession = Pick<User, 'id' | 'name' | 'role'>;

export const UserSession = createParamDecorator(
  (_data: string, ctx: ExecutionContextHost) => {
    const req = ctx.getArgByIndex(2).req;
    // return req.session.user || { id: 'd32da716-8561-4af1-90ab-90432fb58ad3' };
    return req.session.user;
  },
);
