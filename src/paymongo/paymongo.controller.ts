import { Body, Controller, Post, Session } from '@nestjs/common';
import { ExternalFundTransferMethod } from 'src/external-fund-transfers/enums/method.enum';
import { FundTransferStatus } from 'src/fund-transfers/enums/status.enum';
import { FundTransferType } from 'src/fund-transfers/enums/type.enum';
import { ExternalFundTransfersService } from '../external-fund-transfers/external-fund-transfers.service';
import { WebhookEventDto } from './dto/webhook-event.dto';

@Controller('paymongo')
export class PaymongoController {
  constructor(
    private readonly externalFundTransferService: ExternalFundTransfersService,
  ) {}

  @Post('payment-webhook')
  async webhook(
    @Body() webhookEventDto: WebhookEventDto,
    @Session() session: Record<string, any>,
  ) {
    const user = session.user || { id: '12a9b624-3202-463b-9ebc-8fd5e80ee9e4' };
    if (!user) throw new Error('Unauthorized');

    console.log(webhookEventDto);
    console.log('*********************************************');

    const paymentIntentId =
      webhookEventDto?.data?.attributes?.data?.attributes?.payment_intent_id;
    console.log(paymentIntentId);

    // await this.externalFundTransferService.updateCashInStatus(
    //   paymentIntentId,
    //   FundTransferStatus.SUCCESS,
    // );

    return 'null';

    // const externalFundTransfer = await this.externalFundTransferService.create(
    //   webhookEventDto.data.id,
    //   ExternalFundTransferMethod.CASH_IN,
    //   {
    //     amount: webhookEventDto.data.attributes.data.attributes.amount,
    //     currencyId: 'php',
    //     fee:
    //       webhookEventDto.data.attributes.data.attributes.fee +
    //       webhookEventDto.data.attributes.data.attributes.foreign_fee,
    //     paymentServiceId: 'paymongo',
    //     status: FundTransferStatus.SUCCESS,
    //     type: FundTransferType.EXTERNAL,
    //     userId: user.id,
    //   },
    // );

    // return externalFundTransfer;
  }
}
