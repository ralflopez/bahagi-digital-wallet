import { Field } from '@nestjs/graphql';
import { FundTransferStatus } from 'src/fund-transfers/enums/status.enum';

export class UpdateExternalFundTransferStatusInput {
  @Field()
  id: string;

  @Field(() => FundTransferStatus)
  status: FundTransferStatus;
}
