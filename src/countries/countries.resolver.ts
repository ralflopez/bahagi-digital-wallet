import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';
import { CreateCountryInput } from './dto/create-country.input';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/users/enums/role.enum';
import { AuthorizationGuard } from 'src/auth/guard/roles.guard';

@Resolver(() => Country)
export class CountriesResolver {
  constructor(private readonly countriesService: CountriesService) {}

  @Roles(Role.ADMIN)
  @AuthorizationGuard()
  @Mutation(() => Country, {
    name: 'createCountry',
    description: `#### Description
    \n* _Requires admin privileges_
    \n* Creates a new country.`,
  })
  createCountry(
    @Args('createCountryInput') createCountryInput: CreateCountryInput,
  ) {
    return this.countriesService.create(createCountryInput);
  }

  @Query(() => [Country], {
    name: 'countries',
    description: `#### Description
    \nReturns a list of available countries.`,
  })
  findAll() {
    return this.countriesService.findAll();
  }

  @Query(() => Country, {
    name: 'country',
    description: `#### Description
    \nReturns a country given its ID.`,
  })
  findOne(@Args('id') id: string) {
    return this.countriesService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @AuthorizationGuard()
  @Mutation(() => Int, {
    name: 'removeCountry',
    description: `#### Description
    \n* _Requires admin privileges_
    \n* Deletes a country.`,
  })
  removeCountry(@Args('id') id: string) {
    return this.countriesService.remove(id);
  }
}
