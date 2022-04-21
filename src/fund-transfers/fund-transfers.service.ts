import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-errors';
import { CurrenciesService } from 'src/currencies/currencies.service';
import { Repository } from 'typeorm';
import { CreateFundTransferInput } from './dto/create-fund-transfer.input';
import { FundTransfer } from './entities/fund-transfer.entity';
import * as uuid from 'uuid';

@Injectable()
export class FundTransfersService {
  constructor(
    @InjectRepository(FundTransfer)
    private readonly fundTransferRepository: Repository<FundTransfer>,
    private readonly currenciesService: CurrenciesService,
  ) {}

  async create(createFundTransferInput: CreateFundTransferInput) {
    const currency = await this.currenciesService.findOne(
      createFundTransferInput.currencyId,
    );
    if (!currency) throw new UserInputError('Invalid Currency');
    console.log(currency);
    const fundTransfer = this.fundTransferRepository.create({
      ...createFundTransferInput,
      currency,
      id: uuid.v4(),
    });
    const savedFundTransfer = await this.fundTransferRepository.save(
      fundTransfer,
    );
    return savedFundTransfer;
  }

  findAll() {
    return `This action returns all fundTransfers`;
  }

  findOne(id: string) {
    return this.fundTransferRepository.findOne({
      where: {
        id,
      },
      relations: {
        currency: true,
      },
    });
  }

  updateOne(fundTransfer: FundTransfer) {
    return this.fundTransferRepository.save({
      ...fundTransfer,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} fundTransfer`;
  }
}
