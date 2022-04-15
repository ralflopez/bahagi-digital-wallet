import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCountryInput {
  @Field()
  name: string;

  @Field()
  id: string;

  @Field()
  currencyId: string;

  @Field()
  mobileCode: string;
}
