import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundTransfer } from './entities/fund-transfer.entity';
import { FundTransfersService } from './fund-transfers.service';

@Module({
  imports: [TypeOrmModule.forFeature([FundTransfer])],
  providers: [FundTransfersService],
  exports: [FundTransfersService],
})
export class FundTransfersModule {}
