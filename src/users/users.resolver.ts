import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Role } from './enums/role.enum';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthorizationGuard } from 'src/auth/guard/roles.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.ADMIN)
  @AuthorizationGuard()
  @Query(() => [User], {
    name: 'users',
    description: `#### Description
    \n* _Requires admin privileges_
    \n* Returns all user.`,
  })
  findAll() {
    return this.usersService.findAll();
  }

  @AuthGuard()
  @Query(() => User, {
    name: 'user',
    description: `#### Description
    \n* _Requires authentication_
    \n* Returns a user given an ID.`,
  })
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @AuthGuard()
  @Mutation(() => User, {
    name: 'updateUser',
    description: `#### Description
    \n* _Requires admin privileges_
    \n* Updates user information.`,
  })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Roles(Role.ADMIN)
  @AuthorizationGuard()
  @Mutation(() => String, {
    name: 'removeUser',
    description: `#### Description
    \n* _Requires admin privileges_
    \n* Deltes a user.`,
  })
  removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }
}
