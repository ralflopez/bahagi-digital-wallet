import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCountryInput {
  @Field()
  name: string;

  @Field()
  id: string;

  @Field({
    description: 'ID from currency schema',
  })
  currencyId: string;

  @Field({
    description: 'Countrys area code (e.g. +63 for Philippines)',
  })
  mobileCode: string;
}
