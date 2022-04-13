import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('paymongo')
export class PaymongoController {
  @Post('payment-webhook')
  webhook(@Req() request: Request) {
    console.log(request);
    return 'a';
  }
}
