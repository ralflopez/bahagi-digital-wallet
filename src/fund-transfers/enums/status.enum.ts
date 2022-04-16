import { registerEnumType } from '@nestjs/graphql';

export enum FundTransferStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PROCESSING = 'PROCESSING',
}

registerEnumType(FundTransferStatus, { name: 'FundTransferStatus' });
