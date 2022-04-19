import { Query } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ExternalFundTransfer } from 'src/external-fund-transfers/entities/external-fund-transfer.entity';
import { PaymentIntentInput } from './dto/payment-intent.input';
import { PaymentIntentResult } from './entites/payment-intent';
import { PaymongoService } from './paymongo.service';

@Resolver(() => ExternalFundTransfer)
export class PaymongoResolver {
  constructor(private readonly paymongoService: PaymongoService) {}

  @Mutation(() => PaymentIntentResult, { name: 'createPaymongoPaymentIntent' })
  createPaymentIntent(
    @Args('paymentIntentInput') paymentIntentInput: PaymentIntentInput,
  ): Promise<PaymentIntentResult> {
    return this.paymongoService.createPaymentIntent(paymentIntentInput.amount);
  }
}
