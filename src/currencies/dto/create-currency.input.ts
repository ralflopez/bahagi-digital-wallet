import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCurrencyInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  symbol: string;
}
