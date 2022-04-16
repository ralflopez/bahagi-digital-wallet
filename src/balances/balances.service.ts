import { Injectable } from '@nestjs/common';
import { CreateBalanceInput } from './dto/create-balance.input';
import { UpdateBalanceInput } from './dto/update-balance.input';

@Injectable()
export class BalancesService {
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
