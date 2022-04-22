import { Body, Controller, Post, Session } from '@nestjs/common';
import { FundTransferStatus } from 'src/fund-transfers/enums/status.enum';
import { ExternalFundTransfersService } from '../external-fund-transfers/external-fund-transfers.service';
import { WebhookEventDto } from './dto/webhook-event.dto';

@Controller('paymongo')
export class PaymongoController {
  constructor(
    private readonly externalFundTransferService: ExternalFundTransfersService,
  ) {}

  @Post('payment-webhook')
  async webhook(@Body() webhookEventDto: WebhookEventDto) {
    console.log('webhook');

    const paymentIntentId =
      webhookEventDto?.data?.attributes?.data?.attributes?.payment_intent_id;

    const isPaymentFailed =
      webhookEventDto.data.attributes.type === 'payment.failed';

    const externalFundTransfer =
      await this.externalFundTransferService.updateCashInStatus(
        paymentIntentId,
        isPaymentFailed
          ? FundTransferStatus.FAILED
          : FundTransferStatus.SUCCESS,
      );

    return externalFundTransfer;
  }
}
