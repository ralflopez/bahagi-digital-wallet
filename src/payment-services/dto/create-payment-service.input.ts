import { InputType, Field, Float } from '@nestjs/graphql';
import { PaymentServiceType } from '../enums/type.enum';

@InputType()
export class CreatePaymentServiceInput {
  @Field()
  company: string;

  @Field()
  name: string;

  @Field(() => PaymentServiceType)
  type: PaymentServiceType;

  @Field(() => Float)
  percent_fee: number;

  @Field(() => Float)
  minimum_fee: number;

  @Field(() => Float, { nullable: true })
  base_fee: number;
}
