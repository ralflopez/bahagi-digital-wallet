import { InputType, Field, Float } from '@nestjs/graphql';
import { CreateFundTransferInput } from 'src/fund-transfers/dto/create-fund-transfer.input';

@InputType()
export class SendMoneyInput {
  @Field(() => Float)
  amount: number;

  @Field()
  receiverId: string;

  @Field()
  currencyId: string;
}
