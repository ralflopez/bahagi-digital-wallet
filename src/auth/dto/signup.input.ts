import { InputType } from '@nestjs/graphql';
import { CreateUserInput } from 'src/users/dto/create-user.input';

@InputType({
  description: 'Required arguments to create a new user',
})
export class SignUpInput extends CreateUserInput {}
