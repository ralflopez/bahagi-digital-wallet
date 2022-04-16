import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { InternalFundTransfersService } from './internal-fund-transfers.service';
import { InternalFundTransfer } from './entities/internal-fund-transfer.entity';
import { SendMoneyInput } from './dto/send-money.input';

@Resolver(() => InternalFundTransfer)
export class InternalFundTransfersResolver {
  constructor(
    private readonly internalFundTransfersService: InternalFundTransfersService,
  ) {}

  @Mutation(() => InternalFundTransfer, { name: 'sendMoney' })
  create(@Args('sendMoneyInput') sendMoneyInput: SendMoneyInput) {
    return this.internalFundTransfersService.create(sendMoneyInput);
  }

  @Query(() => [InternalFundTransfer], { name: 'internalFundTransfers' })
  findAll() {
    return this.internalFundTransfersService.findAll();
  }
}
