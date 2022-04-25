import { Field, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Required arguments to log in the user',
})
export class LogInInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
