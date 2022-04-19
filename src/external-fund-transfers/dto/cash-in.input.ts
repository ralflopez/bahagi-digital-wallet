import { InputType, Field } from '@nestjs/graphql';
import { CreateFundTransferInput } from 'src/fund-transfers/dto/create-fund-transfer.input';

@InputType()
export class CashInInput extends CreateFundTransferInput {
  @Field()
  userId: string;

  @Field()
  paymentServiceId: string;
}
