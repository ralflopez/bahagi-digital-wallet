import { forwardRef, Module } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { BalancesResolver } from './balances.resolver';
import { ExternalFundTransfersModule } from 'src/external-fund-transfers/external-fund-transfers.module';
import { InternalFundTransfersModule } from 'src/internal-fund-transfers/internal-fund-transfers.module';

@Module({
  imports: [
    InternalFundTransfersModule,
    forwardRef(() => ExternalFundTransfersModule),
  ],
  providers: [BalancesResolver, BalancesService],
  exports: [BalancesService],
})
export class BalancesModule {}
