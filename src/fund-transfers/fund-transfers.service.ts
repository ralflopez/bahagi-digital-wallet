import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFundTransferInput } from './dto/create-fund-transfer.input';
import { FundTransfer } from './entities/fund-transfer.entity';

@Injectable()
export class FundTransfersService {
  constructor(
    @InjectRepository(FundTransfer)
    private fundTransferRepository: Repository<FundTransfer>,
  ) {}

  async create(createFundTransferInput: CreateFundTransferInput) {
    const fundTransfer = this.fundTransferRepository.create(
      createFundTransferInput,
    );
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
