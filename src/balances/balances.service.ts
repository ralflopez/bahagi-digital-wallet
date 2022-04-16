import { Injectable } from '@nestjs/common';
import { ExternalFundTransfersService } from 'src/external-fund-transfers/external-fund-transfers.service';
import { InternalFundTransfersService } from 'src/internal-fund-transfers/internal-fund-transfers.service';
import { CreateBalanceInput } from './dto/create-balance.input';
import { UpdateBalanceInput } from './dto/update-balance.input';

@Injectable()
export class BalancesService {
  constructor(
    private readonly internalFundTransferService: InternalFundTransfersService,
    private readonly externalFundTransferService: ExternalFundTransfersService,
  ) {}

  async getTotalBalance(userId: string) {
    const totalExternal = await this.externalFundTransferService.getTotalAmount(
      userId,
    );
    console.log(totalExternal);
    return JSON.stringify(totalExternal) || 0;
  }

  create(createBalanceInput: CreateBalanceInput) {
    return 'This action adds a new balance';
  }

  findAll() {
    return `This action returns all balances`;
  }

  findOne(id: number) {
    return `This action returns a #${id} balance`;
  }

  update(id: number, updateBalanceInput: UpdateBalanceInput) {
    return `This action updates a #${id} balance`;
  }

  remove(id: number) {
    return `This action removes a #${id} balance`;
  }
}
