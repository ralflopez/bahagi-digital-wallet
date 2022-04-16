import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FundTransferStatus } from 'src/fund-transfers/enums/status.enum';
import { FundTransfersService } from 'src/fund-transfers/fund-transfers.service';
import { PaymentServiceService } from 'src/payment-services/payment-services.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CashInInput } from './dto/cash-in.input';
import { ExternalFundTransfer } from './entities/external-fund-transfer.entity';
import { ExternalFundTransferMethod } from './enums/method.enum';

@Injectable()
export class ExternalFundTransfersService {
  constructor(
    @InjectRepository(ExternalFundTransfer)
    private readonly externalFundTransferRepository: Repository<ExternalFundTransfer>,
    private readonly fundTransferService: FundTransfersService,
    private readonly userService: UsersService,
    private readonly paymentServiceService: PaymentServiceService,
  ) {}

  async create(
    id: string,
    method: ExternalFundTransferMethod,
    createExternalFundTransferInput: CashInInput,
  ) {
    const fundTransfer = await this.fundTransferService.create({
      amount: createExternalFundTransferInput.amount,
      currencyId: createExternalFundTransferInput.currencyId,
      fee: createExternalFundTransferInput.fee,
      status: FundTransferStatus.SUCCESS,
      type: createExternalFundTransferInput.type,
    });

    const user = await this.userService.findOne(
      createExternalFundTransferInput.userId,
    );

    const paymentService = await this.paymentServiceService.findOne(
      createExternalFundTransferInput.paymentServiceId,
    );

    const externalFundTransfer = this.externalFundTransferRepository.create({
      details: fundTransfer,
      id,
      method,
      paymentService,
      user,
    });

    const savedExternalFundTransfer =
      await this.externalFundTransferRepository.save(externalFundTransfer);
    return savedExternalFundTransfer;
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
