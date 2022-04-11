import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesResolver } from './countries.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Currency } from './entities/currency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Currency])],
  providers: [CountriesResolver, CountriesService],
})
export class CountriesModule {}
