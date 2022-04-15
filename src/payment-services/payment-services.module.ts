import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './entities/payment-service.entity';
import { PaymentServiceResolver } from './payment-services.resolver';
import { PaymentServiceService } from './payment-services.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentService])],
  providers: [PaymentServiceResolver, PaymentServiceService],
  exports: [PaymentServiceService],
})
export class PaymentServicesModule {}
