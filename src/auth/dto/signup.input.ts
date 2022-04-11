import { InputType } from '@nestjs/graphql';
import { CreateUserInput } from 'src/users/dto/create-user.input';

@InputType()
export class SignUpInput extends CreateUserInput {}
