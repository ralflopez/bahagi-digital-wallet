import { Module } from '@nestjs/common';
import { ExternalFundTransfersModule } from 'src/external-fund-transfers/external-fund-transfers.module';
import { PaymongoController } from './paymongo.controller';
import { PaymongoResolver } from './paymongo.resolver';
import { PaymongoService } from './paymongo.service';

@Module({
  imports: [ExternalFundTransfersModule],
  controllers: [PaymongoController],
  providers: [PaymongoResolver, PaymongoService],
})
export class PaymongoModule {}
