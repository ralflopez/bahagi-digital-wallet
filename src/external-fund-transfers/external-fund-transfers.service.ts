import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import { FundTransferStatus } from 'src/fund-transfers/enums/status.enum';
import { FundTransferType } from 'src/fund-transfers/enums/type.enum';
import { FundTransfersService } from 'src/fund-transfers/fund-transfers.service';
import { PaymentServiceService } from 'src/payment-services/payment-services.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CashInInput } from './dto/cash-in.input';
import { CashOutInput } from './dto/cash-out.input';
import { ExternalFundTransfer } from './entities/external-fund-transfer.entity';
import { ExternalFundTransferMethod } from './enums/method.enum';
import * as uuid from 'uuid';
import { BalancesService } from 'src/balances/balances.service';
import { PaymentServiceMethod } from 'src/payment-services/enums/method.enum';

@Injectable()
export class ExternalFundTransfersService {
  constructor(
    @InjectRepository(ExternalFundTransfer)
    private readonly externalFundTransferRepository: Repository<ExternalFundTransfer>,
    private readonly fundTransferService: FundTransfersService,
    private readonly userService: UsersService,
    private readonly paymentServiceService: PaymentServiceService,
    @Inject(forwardRef(() => BalancesService))
    private balanceService: BalancesService,
  ) {}

  async cashIn(
    userId: string,
    { amount, currencyId, paymentServiceId, paymentIntentId }: CashInInput,
  ) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new AuthenticationError('You are not logged in');

    const paymentService = await this.paymentServiceService.findOne(
      paymentServiceId,
    );
    if (!paymentService)
      throw new UserInputError('Payment service doesnt exist');

    const fundTransfer = await this.fundTransferService.create({
      amount: amount,
      currencyId: currencyId,
      fee: this.paymentServiceService.computeFee(amount, paymentService),
      status: FundTransferStatus.PROCESSING,
      type: FundTransferType.EXTERNAL,
    });

    const externalFundTransfer = this.externalFundTransferRepository.create({
      details: fundTransfer,
      id: paymentIntentId,
      method: ExternalFundTransferMethod.CASH_IN,
      paymentService,
      user,
    });

    const savedExternalFundTransfer =
      await this.externalFundTransferRepository.save(externalFundTransfer);
    return savedExternalFundTransfer;
  }

  async cashOut(
    userId: string,
    { amount, currencyId, paymentServiceId }: CashOutInput,
  ) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new AuthenticationError('You are not logged in');

    const balance = await this.balanceService.getTotalBalance(user.id);
    if (balance < amount) throw new UserInputError('Insufficient Funds');

    const paymentService = await this.paymentServiceService.findOne(
      paymentServiceId,
    );
    if (!paymentService)
      throw new UserInputError(`Payment Service doesn't exist`);
    if (paymentService.method == PaymentServiceMethod.CASH_IN)
      throw new UserInputError('You cannot cash in with this service');

    const fundTransfer = await this.fundTransferService.create({
      amount,
      currencyId,
      fee: this.paymentServiceService.computeFee(amount, paymentService),
      status: FundTransferStatus.PROCESSING,
      type: FundTransferType.EXTERNAL,
    });

    const externalFundTransfer = this.externalFundTransferRepository.create({
      details: fundTransfer,
      user,
      paymentService,
      method: ExternalFundTransferMethod.CASH_OUT,
      id: uuid.v4(),
    });

    const savedExternalFundTransfer =
      await this.externalFundTransferRepository.save(externalFundTransfer);
    return savedExternalFundTransfer;
  }

  async updateCashInStatus(id: string, status: FundTransferStatus) {
    const externalFundTransfer = await this.findOne(id);

    if (externalFundTransfer.method !== ExternalFundTransferMethod.CASH_IN)
      throw new UserInputError(
        'Wrong method use update cash out method instead',
      );

    const details = externalFundTransfer.details;
    details.status = status;

    await this.fundTransferService.updateOne(details);

    return externalFundTransfer;
  }

  async updateCashOutStatus(id: string, status: FundTransferStatus) {
    const externalFundTransfer = await this.findOne(id);
    if (externalFundTransfer.method !== ExternalFundTransferMethod.CASH_OUT)
      throw new UserInputError(
        'Wrong method use update cash in method instead',
      );

    const details = externalFundTransfer.details;
    details.status = status;

    await this.fundTransferService.updateOne(details);

    return externalFundTransfer;
  }

  findAll() {
    return this.externalFundTransferRepository.find({
      relations: {
        details: {
          currency: true,
        },
        paymentService: true,
        user: {
          country: {
            currency: true,
          },
        },
      },
    });
  }

  async getTotalAmount(userId: string) {
    const userExternalFundTransfer = await this.externalFundTransferRepository
      .createQueryBuilder('external_fund_transfer')
      .leftJoin('external_fund_transfer.details', 'details')
      .select('SUM(details.amount)', 'total')
      // .groupBy('external_fund_transfer.userId')
      .where('external_fund_transfer.userId = :userId', { userId: userId })
      .andWhere('details.status = :status', {
        status: FundTransferStatus.SUCCESS,
      })
      .getRawOne();
    return userExternalFundTransfer;
  }

  findOne(id: string) {
    return this.externalFundTransferRepository.findOne({
      where: {
        id,
      },
      relations: {
        details: {
          currency: true,
        },
        paymentService: true,
        user: {
          country: {
            currency: true,
          },
        },
      },
    });
  }

  async remove(id: string): Promise<number> {
    const result = await this.externalFundTransferRepository.delete(id);
    return result.affected || 0;
  }
}
