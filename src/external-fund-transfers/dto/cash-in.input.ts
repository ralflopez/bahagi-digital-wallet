import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CashInInput {
  @Field()
  paymentServiceId: string;

  @Field(() => Float)
  amount: number;

  @Field()
  currencyId: string;

  @Field()
  paymentIntentId: string;
}
