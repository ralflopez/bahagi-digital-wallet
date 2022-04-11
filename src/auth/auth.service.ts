import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UsersService } from 'src/users/users.service';
import { LogInInput } from './dto/login.input';
import { SignUpInput } from './dto/signup.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(signUpInput: SignUpInput) {
    const passwordHash = await bcrypt.hash(signUpInput.password, 10);
    const createUserInput: CreateUserInput = {
      ...signUpInput,
      password: passwordHash,
    };

    return this.userService.create(createUserInput);
  }

  async logIn(loginInput: LogInInput) {
    const user = await this.userService.findOneByEmail(loginInput.email);
    // compare password
    const isRightPassword = await bcrypt.compare(
      loginInput.password,
      user.password,
    );
    if (!isRightPassword) throw Error('Incorrect email / password');

    return user;
  }
}
