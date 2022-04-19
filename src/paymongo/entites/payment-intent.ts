import { Field, ObjectType } from '@nestjs/graphql';
// import { PaymongoStatus } from '../enums/status';

// @ObjectType()
// export class PaymentIntentDataAttribute {
//   @Field(() => Float)
//   amount: number;

//   @Field()
//   capture_type: string;

//   @Field()
//   client_key: string;

//   @Field()
//   currency: 'PHP';

//   @Field({ nullable: true })
//   description: string | null;

//   @Field(() => Boolean)
//   livemode: boolean;

//   @Field()
//   statement_descriptor: string;

//   @Field(() => PaymongoStatus)
//   status: PaymongoStatus;

//   @Field(() => Int)
//   created_at: number;

//   @Field(() => Int)
//   updated_at: number;
//   last_payment_error: unknown;
//   payment_method_allowed: any[];
//   payments: any[];
//   next_action: unknown;
//   payment_method_options: any[];
//   metadata: unknown;
// }

// @ObjectType()
// export class PaymentIntentData {
//   @Field()
//   id: string;

//   @Field()
//   type: 'payment_intent';

//   @Field(() => PaymentIntentDataAttribute)
//   attributes: PaymentIntentDataAttribute;
// }

@ObjectType()
export class PaymentIntentResult {
  @Field()
  clientKey: string;
}
