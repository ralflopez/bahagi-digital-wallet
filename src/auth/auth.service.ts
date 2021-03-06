import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UsersService } from 'src/users/users.service';
import { LogInInput } from './dto/login.input';
import { SignUpInput } from './dto/signup.input';
import * as bcrypt from 'bcrypt';
import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import { AuthGuard } from './guard/auth.guard';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(signUpInput: SignUpInput) {
    const passwordHash = await bcrypt.hash(signUpInput.password, 10);
    const createUserInput: CreateUserInput = {
      ...signUpInput,
      password: passwordHash,
    };

    const newUser = await this.userService.create(createUserInput);
    return newUser;
  }

  async logIn({ email, password }: LogInInput) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UserInputError('Incorrect email / password');
    // compare password
    const isRightPassword = await bcrypt.compare(password, user.password);
    if (!isRightPassword)
      throw new UserInputError('Incorrect email / password');

    return user;
  }

  @AuthGuard()
  async getMyUser(userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new AuthenticationError('You are not logged in');
    return user;
  }
}
