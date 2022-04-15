import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreatePaymentServiceInput } from './dto/create-payment-service.input';
import { PaymentService } from './entities/payment-service.entity';
import { PaymentServiceService } from './payment-services.service';

@Resolver(() => PaymentService)
export class PaymentServiceResolver {
  constructor(private readonly paymentServiceService: PaymentServiceService) {}

  @Mutation(() => PaymentService)
  createPaymentService(
    @Args('createPaymentGatewayInput')
    createPaymentGatewayInput: CreatePaymentServiceInput,
  ) {
    return this.paymentServiceService.create(createPaymentGatewayInput);
  }

  @Query(() => [PaymentService], { name: 'paymentServices' })
  findAll() {
    return this.paymentServiceService.findAll();
  }

  @Query(() => PaymentService, { name: 'paymentService' })
  findOne(@Args('id') id: string) {
    return this.paymentServiceService.findOne(id);
  }

  @Mutation(() => Int)
  removePaymentService(@Args('id') id: string) {
    return this.paymentServiceService.remove(id);
  }
}
