import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBalanceInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
