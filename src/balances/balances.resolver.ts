import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BalancesService } from './balances.service';
import { Balance } from './entities/balance.entity';
import { CreateBalanceInput } from './dto/create-balance.input';
import { UpdateBalanceInput } from './dto/update-balance.input';

@Resolver(() => Balance)
export class BalancesResolver {
  constructor(private readonly balancesService: BalancesService) {}

  @Mutation(() => Balance)
  createBalance(@Args('createBalanceInput') createBalanceInput: CreateBalanceInput) {
    return this.balancesService.create(createBalanceInput);
  }

  @Query(() => [Balance], { name: 'balances' })
  findAll() {
    return this.balancesService.findAll();
  }

  @Query(() => Balance, { name: 'balance' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.balancesService.findOne(id);
  }

  @Mutation(() => Balance)
  updateBalance(@Args('updateBalanceInput') updateBalanceInput: UpdateBalanceInput) {
    return this.balancesService.update(updateBalanceInput.id, updateBalanceInput);
  }

  @Mutation(() => Balance)
  removeBalance(@Args('id', { type: () => Int }) id: number) {
    return this.balancesService.remove(id);
  }
}
