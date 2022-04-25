import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class PaymentIntentInput {
  @Field(() => Float, {
    description:
      'Amount should be in full currencies (e.g Pesos instead of cents)',
  })
  amount: number;
}
