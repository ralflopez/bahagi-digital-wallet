import { Resolver, Query, Args, Float } from '@nestjs/graphql';
import {
  IUserSession,
  UserSession,
} from 'src/auth/decorators/user-session.decorator';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { BalancesService } from './balances.service';
import { Balance } from './entities/balance.entity';

@Resolver(() => Balance)
export class BalancesResolver {
  constructor(private readonly balancesService: BalancesService) {}

  @AuthGuard()
  @Query(() => Float, {
    name: 'totalBalance',
    description: `#### Description
    \n* _Requires authentication_
    \n* Returns the total balance of the logged in user.`,
  })
  getBalance(@UserSession() { id }: IUserSession) {
    return this.balancesService.getTotalBalance(id);
  }
}
