import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-errors';
import { CurrenciesService } from 'src/currencies/currencies.service';
import { Repository } from 'typeorm';
import { CreateFundTransferInput } from './dto/create-fund-transfer.input';
import { FundTransfer } from './entities/fund-transfer.entity';

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

    const fundTransfer = this.fundTransferRepository.create({
      ...createFundTransferInput,
      currency,
    });
    const savedFundTransfer = await this.fundTransferRepository.save(
      fundTransfer,
    );
    return savedFundTransfer;
  }

  findAll() {
    return `This action returns all fundTransfers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fundTransfer`;
  }

  remove(id: number) {
    return `This action removes a #${id} fundTransfer`;
  }
}
