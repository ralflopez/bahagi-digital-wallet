import { registerEnumType } from '@nestjs/graphql';

export enum ExternalFundTransferMethod {
  CASH_IN = 'CASH_IN',
  CASH_OUT = 'CASH_OUT',
}

registerEnumType(ExternalFundTransferMethod, {
  name: 'ExternalFundTransferMethod',
});
