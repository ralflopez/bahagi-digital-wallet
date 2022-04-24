import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthorizationGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/users/enums/role.enum';
import { CreatePaymentServiceInput } from './dto/create-payment-service.input';
import { PaymentService } from './entities/payment-service.entity';
import { PaymentServiceService } from './payment-services.service';

@Resolver(() => PaymentService)
export class PaymentServiceResolver {
  constructor(private readonly paymentServiceService: PaymentServiceService) {}

  @Roles(Role.USER)
  @AuthorizationGuard()
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

  @Roles(Role.ADMIN)
  @AuthorizationGuard()
  @Mutation(() => Int)
  removePaymentService(@Args('id') id: string) {
    return this.paymentServiceService.remove(id);
  }
}
