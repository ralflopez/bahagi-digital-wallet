import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/countries/entities/country.entity';
import { Currency } from 'src/currencies/entities/currency.entity';
import { ExternalFundTransfer } from 'src/external-fund-transfers/entities/external-fund-transfer.entity';
import { FundTransfer } from 'src/fund-transfers/entities/fund-transfer.entity';
import { InternalFundTransfer } from 'src/internal-fund-transfers/entities/internal-fund-transfer.entity';
import { PaymentService } from 'src/payment-services/entities/payment-service.entity';
import { User } from 'src/users/entities/user.entity';
import { SeedsService } from './seeds.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Currency,
      Country,
      PaymentService,
      User,
      FundTransfer,
      ExternalFundTransfer,
      InternalFundTransfer,
    ]),
  ],
  providers: [SeedsService],
})
export class SeedsModule {}
