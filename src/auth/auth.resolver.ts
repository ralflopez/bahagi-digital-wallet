import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Session } from 'src/graphql/decorators/session.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LogInInput } from './dto/login.input';
import { SignUpInput } from './dto/signup.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async logIn(
    @Args('logIninput') logInInput: LogInInput,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.logIn(logInInput);

    // store in session
    session['user'] = {
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
    };

    return user;
  }

  @Mutation(() => User)
  async signUp(
    @Args('signUpInput') signUpInput: SignUpInput,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.signUp(signUpInput);

    // store in session
    session['user'] = {
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
    };

    return user;
  }

  // @Query(() => User)
  // getMyUser(@Args('id') id: string) {
  //   return this.authService.getMyUser(id);
  // }
}
