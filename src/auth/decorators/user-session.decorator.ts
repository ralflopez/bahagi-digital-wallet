import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { User } from 'src/users/entities/user.entity';

export type IUserSession = Pick<User, 'id' | 'name' | 'role'>;

export const UserSession = createParamDecorator(
  (_data: string, ctx: ExecutionContextHost) => {
    const req = ctx.getArgByIndex(2).req;
    return req.session.user;
  },
);
