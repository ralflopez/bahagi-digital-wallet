import { CreateBalanceInput } from './create-balance.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBalanceInput extends PartialType(CreateBalanceInput) {
  @Field(() => Int)
  id: number;
}
