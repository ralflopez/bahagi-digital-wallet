import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthorizationGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/users/enums/role.enum';
import { Repository } from 'typeorm';
import { CreateCurrencyInput } from './dto/create-currency.input';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
  ) {}

  @Roles(Role.ADMIN)
  @AuthorizationGuard()
  async create(createCurrencyInput: CreateCurrencyInput): Promise<Currency> {
    const currency = this.currencyRepository.create({
      id: createCurrencyInput.id,
      name: createCurrencyInput.name,
      symbol: createCurrencyInput.symbol,
    });

    const savedCurrency = await this.currencyRepository.save(currency);

    return savedCurrency;
  }

  findAll(): Promise<Currency[]> {
    return this.currencyRepository.find();
  }

  async findOne(id: string): Promise<Currency> {
    const currency = await this.currencyRepository.findOne({
      where: {
        id,
      },
    });

    return currency;
  }

  @Roles(Role.ADMIN)
  @AuthorizationGuard()
  async remove(id: string): Promise<number> {
    const result = await this.currencyRepository.delete(id);
    return result.affected || 0;
  }
}
