import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrenciesService } from './currencies.service';
import { Currency } from './entities/currency.entity';
import { CreateCurrencyInput } from './dto/create-currency.input';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthorizationGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/users/enums/role.enum';

@Resolver(() => Currency)
export class CurrenciesResolver {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Roles(Role.ADMIN)
  @AuthorizationGuard()
  @Mutation(() => Currency)
  createCurrency(
    @Args('createCurrencyInput') createCurrencyInput: CreateCurrencyInput,
  ) {
    return this.currenciesService.create(createCurrencyInput);
  }

  @Query(() => [Currency], { name: 'currencies' })
  findAll() {
    return this.currenciesService.findAll();
  }

  @Query(() => Currency, { name: 'currency' })
  findOne(@Args('id') id: string) {
    return this.currenciesService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @AuthorizationGuard()
  @Mutation(() => Int)
  removeCurrency(@Args('id') id: string) {
    return this.currenciesService.remove(id);
  }
}
