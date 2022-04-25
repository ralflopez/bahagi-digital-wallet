import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Session } from 'src/graphql/decorators/session.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { Roles } from './decorators/role.decorator';
import { IUserSession, UserSession } from './decorators/user-session.decorator';
import { LogInInput } from './dto/login.input';
import { SignUpInput } from './dto/signup.input';
import { AuthGuard } from './guard/auth.guard';

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

  @AuthGuard()
  @Query(() => User, { name: 'myUser' })
  getMyUser(@UserSession() userSession: IUserSession) {
    return this.authService.getMyUser(userSession.id);
  }
}
