import { Module } from '@nestjs/common';
import { InternalFundTransfersService } from './internal-fund-transfers.service';
import { InternalFundTransfersResolver } from './internal-fund-transfers.resolver';
import { FundTransfersModule } from 'src/fund-transfers/fund-transfers.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternalFundTransfer } from './entities/internal-fund-transfer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InternalFundTransfer]),
    FundTransfersModule,
    UsersModule,
  ],
  providers: [InternalFundTransfersResolver, InternalFundTransfersService],
})
export class InternalFundTransfersModule {}
