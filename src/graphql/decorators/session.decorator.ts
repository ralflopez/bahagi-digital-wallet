import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const Session = createParamDecorator(
  (_data: string, ctx: ExecutionContextHost) => {
    const req = ctx.getArgByIndex(2).req;
    return req.session;
  },
);
