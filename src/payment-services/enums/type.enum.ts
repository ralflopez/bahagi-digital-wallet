import { registerEnumType } from '@nestjs/graphql';

export enum PaymentServiceType {
  SERVICE = 'SERVICE',
  BANK = 'BANK',
  OTC = 'OTC',
}

registerEnumType(PaymentServiceType, { name: 'PaymentServiceType' });
