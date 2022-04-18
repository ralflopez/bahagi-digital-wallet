import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationError } from 'apollo-server-errors';
import { FundTransferStatus } from 'src/fund-transfers/enums/status.enum';
import { FundTransferType } from 'src/fund-transfers/enums/type.enum';
import { FundTransfersService } from 'src/fund-transfers/fund-transfers.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { SendMoneyInput } from './dto/send-money.input';
import { InternalFundTransfer } from './entities/internal-fund-transfer.entity';
import * as uuid from 'uuid';

@Injectable()
export class InternalFundTransfersService {
  constructor(
    @InjectRepository(InternalFundTransfer)
    private readonly internalFundTransfer: Repository<InternalFundTransfer>,
    private readonly fundTransferService: FundTransfersService,
    private readonly userService: UsersService,
  ) {}

  async create(
    userId: string,
    sendMoneyInput: SendMoneyInput,
  ): Promise<InternalFundTransfer> {
    // TODO: should be the same currency
    // TODO: should receiver not self

    const fundTransfer = await this.fundTransferService.create({
      amount: sendMoneyInput.amount,
      fee: 0,
      status: FundTransferStatus.SUCCESS,
      type: FundTransferType.INTERNAL,
      currencyId: sendMoneyInput.currencyId,
    });

    const receiver = await this.userService.findOne(sendMoneyInput.receiverId);
    if (!receiver) throw new Error("User doesn't exist");

    const sender = await this.userService.findOne(userId);
    if (!receiver) throw new AuthenticationError('You are not logged in');

    const internalFundTransfer = this.internalFundTransfer.create({
      details: fundTransfer,
      receiver,
      sender,
      id: uuid.v4(),
    });

    const savedInternalFundTransfer = await this.internalFundTransfer.save(
      internalFundTransfer,
    );
    return savedInternalFundTransfer;
  }

  findAll(): Promise<InternalFundTransfer[]> {
    return this.internalFundTransfer.find({
      relations: {
        sender: true,
        receiver: true,
        details: true,
      },
    });
  }

  async getTotalAmount(userId: string) {
    const sentAmount = await this.internalFundTransfer
      .createQueryBuilder('internal_fund_transfer')
      .leftJoin('internal_fund_transfer.details', 'details')
      .leftJoin('internal_fund_transfer.sender', 'sender')
      .select('SUM(details.amount)', 'total')
      // .groupBy('internal_fund_transfer.receiverId')
      .where('internal_fund_transfer.senderId = :userId', { userId })
      .getRawMany();
    return sentAmount;
  }
}
