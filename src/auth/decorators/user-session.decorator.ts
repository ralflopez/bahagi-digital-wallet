import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { User } from 'src/users/entities/user.entity';

export type IUserSession = Pick<User, 'id' | 'name' | 'role'>;

export const UserSession = createParamDecorator(
  (_data: string, ctx: ExecutionContextHost) => {
    const req = ctx.getArgByIndex(2).req;
    return req.session.user || { id: 'a58f0388-7699-4e76-b78e-8e1fbe85088e' };
    // return { email: 'test@email.com', id: '1', name: 'test name' };
  },
);

// {
//       "createdAt": "2022-04-15T07:08:24.008Z",
//       "email": "test@email.com",
//       "id": "6a4ff7f4-33d3-4de3-957d-6f7ad6a6fb2a",
//       "name": "test",
//       "role": "USER"
//     }
