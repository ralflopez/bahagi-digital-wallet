import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrenciesModule } from 'src/currencies/currencies.module';
import { FundTransfer } from './entities/fund-transfer.entity';
import { FundTransfersService } from './fund-transfers.service';

@Module({
  imports: [TypeOrmModule.forFeature([FundTransfer]), CurrenciesModule],
  providers: [FundTransfersService],
  exports: [FundTransfersService],
})
export class FundTransfersModule {}
