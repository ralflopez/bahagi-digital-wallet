import { Resolver, Query } from '@nestjs/graphql';
import {
  IUserSession,
  UserSession,
} from 'src/auth/decorators/user-session.decorator';
import { BalancesService } from './balances.service';
import { Balance } from './entities/balance.entity';

@Resolver(() => Balance)
export class BalancesResolver {
  constructor(private readonly balancesService: BalancesService) {}

  @Query(() => String, { name: 'totalBalance' })
  getBalance(@UserSession() userSession: IUserSession) {
    return this.balancesService.getTotalBalance(userSession.id);
  }
}
