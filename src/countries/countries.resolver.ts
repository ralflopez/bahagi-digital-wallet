import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';
import { CreateCountryInput } from './dto/create-country.input';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/users/enums/role.enum';
import { AuthorizationGuard } from 'src/auth/guard/roles.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Resolver(() => Country)
export class CountriesResolver {
  constructor(private readonly countriesService: CountriesService) {}

  @Mutation(() => Country)
  @Roles(Role.ADMIN)
  @AuthorizationGuard()
  createCountry(
    @Args('createCountryInput') createCountryInput: CreateCountryInput,
  ) {
    return this.countriesService.create(createCountryInput);
  }

  @Query(() => [Country], { name: 'countries' })
  findAll() {
    return this.countriesService.findAll();
  }

  @Query(() => Country, { name: 'country' })
  findOne(@Args('id') id: string) {
    return this.countriesService.findOne(id);
  }

  @Mutation(() => Int)
  @Roles(Role.ADMIN)
  @AuthorizationGuard()
  removeCountry(@Args('id') id: string) {
    return this.countriesService.remove(id);
  }
}
