import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';
import { CreateCountryInput } from './dto/create-country.input';

@Resolver(() => Country)
export class CountriesResolver {
  constructor(private readonly countriesService: CountriesService) {}

  @Mutation(() => Country)
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
  removeCountry(@Args('id') id: string) {
    return this.countriesService.remove(id);
  }
}
