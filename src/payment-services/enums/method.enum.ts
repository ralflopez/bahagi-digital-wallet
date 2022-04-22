import { registerEnumType } from '@nestjs/graphql';

export enum PaymentServiceMethod {
  CASH_IN = 'CASH_IN',
  CASH_OUT = 'CASH_OUT',
  ANY = 'ANY',
}

registerEnumType(PaymentServiceMethod, { name: 'PaymentServiceMethod' });
