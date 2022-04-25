import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExternalFundTransfersService } from './external-fund-transfers.service';
import { ExternalFundTransfer } from './entities/external-fund-transfer.entity';
import { CashOutInput } from './dto/cash-out.input';
import {
  IUserSession,
  UserSession,
} from 'src/auth/decorators/user-session.decorator';
import { UpdateExternalFundTransferStatusInput } from './dto/update-cash-out-status.input';
import { CashInInput } from './dto/cash-in.input';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/users/enums/role.enum';
import { AuthorizationGuard } from 'src/auth/guard/roles.guard';

@AuthGuard()
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

  @Mutation(() => ExternalFundTransfer, {
    name: 'cashIn',
    description: `#### Description
    \n* _Requires authentication_
    \n* Creates a record for incoming user funds from external source (e.g credit card).
    \n* Status will be set to PROCESSING.`,
  })
  cashIn(
    @Args('cashInInput') cashInInput: CashInInput,
    @UserSession() userSession: IUserSession,
  ) {
    return this.externalFundTransfersService.cashIn(
      userSession.id,
      cashInInput,
    );
  }

  @Mutation(() => ExternalFundTransfer, {
    name: 'cashOut',
    description: `#### Description
    \n* _Requires authentication_
    \n* Creates a record for outgoing user funds.
    \n* Status will be set to PROCESSING.`,
  })
  cashOut(
    @Args('cashOutInput') cashOutInput: CashOutInput,
    @UserSession() userSession: IUserSession,
  ) {
    return this.externalFundTransfersService.cashOut(
      userSession.id,
      cashOutInput,
    );
  }

  @Mutation(() => ExternalFundTransfer, {
    name: 'updateCashInStatus',
    description: `#### Description
    \n* _Requires authentication_
    \n* Updates the cashIn status.`,
  })
  updateCashInStatus(
    @Args('updateExternalFundTransferStatusInput')
    { id, status }: UpdateExternalFundTransferStatusInput,
  ) {
    return this.externalFundTransfersService.updateCashInStatus(id, status);
  }

  @Mutation(() => ExternalFundTransfer, {
    name: 'updateCashOutStatus',
    description: `#### Description
    \n* _Requires authentication_
    \n* Updaates the cashOut status.`,
  })
  updateCashOutStatus(
    @Args('updateExternalFundTransferStatusInput')
    { id, status }: UpdateExternalFundTransferStatusInput,
  ) {
    return this.externalFundTransfersService.updateCashOutStatus(id, status);
  }

  @Query(() => [ExternalFundTransfer], {
    name: 'externalFundTransfers',
    description: `#### Description
    \n* _Requires authentication_
    \n* Returns a list of all the cash in and cash out transactions.`,
  })
  findAll() {
    return this.externalFundTransfersService.findAll();
  }

  @Query(() => ExternalFundTransfer, {
    name: 'externalFundTransfer',
    description: `#### Description
    \n* _Requires authentication_
    \n* Returns a cash in / cash out record given an ID.`,
  })
  findOne(@Args('id') id: string) {
    return this.externalFundTransfersService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @AuthorizationGuard()
  @Mutation(() => Int, {
    name: 'removeExternalFundTransfer',
    description: `#### Description
    \n* _Requires admin privileges_
    \n* Deletes a cash in / cash out record.`,
  })
  removeExternalFundTransfer(@Args('id') id: string) {
    return this.externalFundTransfersService.remove(id);
  }
}
