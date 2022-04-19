import { Field } from '@nestjs/graphql';
import { FundTransferStatus } from 'src/fund-transfers/enums/status.enum';

export class UpdateCashOutStatusInput {
  @Field()
  id: string;

  @Field(() => FundTransferStatus)
  status: FundTransferStatus;
}
