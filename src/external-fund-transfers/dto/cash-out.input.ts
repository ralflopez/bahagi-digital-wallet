import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CashOutInput {
  @Field(() => Float)
  amount: number;

  @Field()
  currencyId: string;

  @Field()
  paymentServiceId: string;
}
