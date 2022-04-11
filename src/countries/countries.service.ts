import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryInput } from './dto/create-country.input';
import { Country } from './entities/country.entity';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country) private countryRepository: Repository<Country>,
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
  ) {}

  async create(createCountryInput: CreateCountryInput) {
    // create currency
    const currency = this.currencyRepository.create({
      name: createCountryInput.currencyName,
      symbol: createCountryInput.currencySymbol,
    });

    const savedCurrency = await this.currencyRepository.save(currency);

    // create country
    const country = this.countryRepository.create({
      currency: savedCurrency,
      mobileCode: createCountryInput.mobileCode,
      name: createCountryInput.name,
      id: createCountryInput.id,
    });

    const savedCountry = await this.countryRepository.save(country);

    return savedCountry;
  }

  findAll() {
    return this.countryRepository.find();
  }

  findOne(id: string) {
    return this.countryRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    await this.countryRepository.delete(id);
    return id;
  }
}
