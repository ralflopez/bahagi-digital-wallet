import { Module } from '@nestjs/common';
import { ExternalFundTransfersService } from './external-fund-transfers.service';
import { ExternalFundTransfersResolver } from './external-fund-transfers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalFundTransfer } from './entities/external-fund-transfer.entity';
import { PaymongoService } from '../paymongo/paymongo.service';
import { PaymongoController } from '../paymongo/paymongo.controller';
import { FundTransfersModule } from 'src/fund-transfers/fund-transfers.module';
import { UsersModule } from 'src/users/users.module';
import { PaymentServicesModule } from 'src/payment-services/payment-services.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExternalFundTransfer]),
    FundTransfersModule,
    UsersModule,
    PaymentServicesModule,
  ],
  providers: [
    ExternalFundTransfersResolver,
    ExternalFundTransfersService,
    PaymongoService,
    PaymongoController,
  ],
  exports: [ExternalFundTransfersService],
})
export class ExternalFundTransfersModule {}
