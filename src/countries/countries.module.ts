import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesResolver } from './countries.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Currency } from '../currencies/entities/currency.entity';
import { CurrenciesModule } from 'src/currencies/currencies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Currency]), CurrenciesModule],
  providers: [CountriesResolver, CountriesService],
  exports: [CountriesService],
})
export class CountriesModule {}
