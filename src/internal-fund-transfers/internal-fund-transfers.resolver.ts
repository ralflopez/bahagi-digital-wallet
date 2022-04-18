import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { InternalFundTransfersService } from './internal-fund-transfers.service';
import { InternalFundTransfer } from './entities/internal-fund-transfer.entity';
import { SendMoneyInput } from './dto/send-money.input';
import {
  IUserSession,
  UserSession,
} from 'src/auth/decorators/user-session.decorator';
import { CreateInternalFundTransfer } from './dto/create-internal-fund-transfer.input';

@Resolver(() => InternalFundTransfer)
export class InternalFundTransfersResolver {
  constructor(
    private readonly internalFundTransfersService: InternalFundTransfersService,
  ) {}

  @Mutation(() => InternalFundTransfer, { name: 'createInternalFundTransfer' })
  create(
    @Args('createInternalFundTransferInput')
    createInternalFundTransferInput: CreateInternalFundTransfer,
  ) {
    return this.internalFundTransfersService.create(
      createInternalFundTransferInput.senderId,
      createInternalFundTransferInput,
    );
  }

  @Mutation(() => InternalFundTransfer, { name: 'sendMoney' })
  sendMoney(
    @Args('sendMoneyInput') sendMoneyInput: SendMoneyInput,
    @UserSession() userSession: IUserSession,
  ) {
    return this.internalFundTransfersService.create(
      userSession.id,
      sendMoneyInput,
    );
  }

  @Query(() => [InternalFundTransfer], { name: 'internalFundTransfers' })
  findAll() {
    return this.internalFundTransfersService.findAll();
  }
}
