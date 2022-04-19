import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class PaymentIntentInput {
  @Field(() => Float)
  amount: number;
}
