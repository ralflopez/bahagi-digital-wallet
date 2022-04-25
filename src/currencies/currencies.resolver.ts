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
  @Mutation(() => Currency, {
    name: 'createCurrency',
    description: `#### Description
    \n* _Requires admin privileges_
    \n* Creates a new currency.`,
  })
  createCurrency(
    @Args('createCurrencyInput') createCurrencyInput: CreateCurrencyInput,
  ) {
    return this.currenciesService.create(createCurrencyInput);
  }

  @Query(() => [Currency], {
    name: 'currencies',
    description: `#### Description
    \nReturns a list of available currencies.`,
  })
  findAll() {
    return this.currenciesService.findAll();
  }

  @Query(() => Currency, {
    name: 'currency',
    description: `#### Description
    \Returns a currency given its ID`,
  })
  findOne(@Args('id') id: string) {
    return this.currenciesService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @AuthorizationGuard()
  @Mutation(() => Int, {
    name: 'removeCurrency',
    description: `#### Description
    \n* _Requires admin privileges_
    \n* Deletes a country.`,
  })
  removeCurrency(@Args('id') id: string) {
    return this.currenciesService.remove(id);
  }
}
