import { Field, InputType } from '@nestjs/graphql';
import { FundTransferStatus } from 'src/fund-transfers/enums/status.enum';

@InputType()
export class UpdateExternalFundTransferStatusInput {
  @Field()
  id: string;

  @Field(() => FundTransferStatus)
  status: FundTransferStatus;
}
