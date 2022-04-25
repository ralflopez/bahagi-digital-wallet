import { Query } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ExternalFundTransfer } from 'src/external-fund-transfers/entities/external-fund-transfer.entity';
import { PaymentIntentInput } from './dto/payment-intent.input';
import { PaymentIntentResult } from './entites/payment-intent';
import { PaymongoService } from './paymongo.service';

@AuthGuard()
@Resolver(() => ExternalFundTransfer)
export class PaymongoResolver {
  constructor(private readonly paymongoService: PaymongoService) {}

  @Mutation(() => PaymentIntentResult, {
    name: 'createPaymongoPaymentIntent',
    description: `#### Description
    \n* _Requires authentication_
    \n* Calls paymongo api to create a payment intent (tells paymongo that you are expecting a payment).`,
  })
  createPaymentIntent(
    @Args('paymentIntentInput') paymentIntentInput: PaymentIntentInput,
  ): Promise<PaymentIntentResult> {
    return this.paymongoService.createPaymentIntent(paymentIntentInput.amount);
  }
}
