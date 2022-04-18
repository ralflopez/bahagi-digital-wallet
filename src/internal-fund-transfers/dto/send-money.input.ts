import { InputType, Field, Float } from '@nestjs/graphql';
@InputType()
export class SendMoneyInput {
  @Field(() => Float)
  amount: number;

  @Field()
  receiverId: string;

  @Field()
  currencyId: string;
}
