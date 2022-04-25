import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  phoneNumber: string;

  @Field({
    description: 'ID from the country schema',
  })
  countryId: string;
}
