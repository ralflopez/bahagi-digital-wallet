import { registerEnumType } from '@nestjs/graphql';

export enum FundTransferType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

registerEnumType(FundTransferType, { name: 'FundTransferType' });
