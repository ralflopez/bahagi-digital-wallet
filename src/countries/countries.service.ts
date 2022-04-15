import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryInput } from './dto/create-country.input';
import { Country } from './entities/country.entity';
import { CurrenciesService } from 'src/currencies/currencies.service';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country) private countryRepository: Repository<Country>,
    private currencyService: CurrenciesService,
  ) {}

  async create(createCountryInput: CreateCountryInput): Promise<Country> {
    // get currency currency
    const currency = await this.currencyService.findOne(
      createCountryInput.currencyId,
    );
    if (!currency)
      throw new Error(
        `Currency: ${createCountryInput.currencyId} does not exist`,
      );

    // create country
    const country = this.countryRepository.create({
      currency,
      mobileCode: createCountryInput.mobileCode,
      name: createCountryInput.name,
      id: createCountryInput.id,
    });

    const savedCountry = await this.countryRepository.save(country);
    return savedCountry;
  }

  async findAll(): Promise<Country[]> {
    return this.countryRepository.find({
      relations: {
        currency: true,
      },
    });
  }

  findOne(id: string): Promise<Country> {
    return this.countryRepository.findOne({
      relations: {
        currency: true,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<number> {
    const result = await this.countryRepository.delete(id);
    return result.affected || 0;
  }
}
