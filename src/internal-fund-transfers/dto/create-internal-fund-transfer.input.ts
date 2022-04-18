import { Field, InputType } from '@nestjs/graphql';
import { SendMoneyInput } from './send-money.input';

@InputType()
export class CreateInternalFundTransfer extends SendMoneyInput {
  @Field()
  senderId: string;

  @Field()
  receiverId: string;
}
