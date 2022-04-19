import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExternalFundTransfersService } from './external-fund-transfers.service';
import { ExternalFundTransfer } from './entities/external-fund-transfer.entity';
import { CashOutInput } from './dto/cash-out.input';
import * as uuid from 'uuid';
import { ExternalFundTransferMethod } from './enums/method.enum';
import {
  IUserSession,
  UserSession,
} from 'src/auth/decorators/user-session.decorator';

@Resolver(() => ExternalFundTransfer)
export class ExternalFundTransfersResolver {
  constructor(
    private readonly externalFundTransfersService: ExternalFundTransfersService,
  ) {}

  // @Mutation(() => ExternalFundTransfer, { name: 'cashIn' })
  // createExternalFundTransfer(
  //   @Args('createExternalFundTransferInput')
  //   createExternalFundTransferInput: CashInInput,
  // ) {
  // return this.externalFundTransfersService.create(
  //   createExternalFundTransferInput,
  // );
  // }

  @Mutation(() => ExternalFundTransfer, { name: 'cashOut' })
  cashOut(
    @Args('cashOutInput') cashOutInput: CashOutInput,
    @UserSession() userSession: IUserSession,
  ) {
    return this.externalFundTransfersService.cashOut(
      userSession.id,
      cashOutInput,
    );
  }

  @Query(() => [ExternalFundTransfer], { name: 'externalFundTransfers' })
  findAll() {
    return this.externalFundTransfersService.findAll();
  }

  @Query(() => ExternalFundTransfer, { name: 'externalFundTransfer' })
  findOne(@Args('id') id: string) {
    return this.externalFundTransfersService.findOne(id);
  }

  @Mutation(() => Int)
  removeExternalFundTransfer(@Args('id') id: string) {
    return this.externalFundTransfersService.remove(id);
  }
}
