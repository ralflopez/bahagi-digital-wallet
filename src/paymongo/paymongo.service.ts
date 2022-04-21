import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as Paymongo from 'paymongo';
import * as dotenv from 'dotenv';
import { PaymentIntentResult } from './entites/payment-intent';

dotenv.config();

@Injectable()
export class PaymongoService implements OnApplicationBootstrap {
  paymongo: any;

  constructor() {
    this.paymongo = new Paymongo(process.env.PAYMONGO_SK);
  }

  async onApplicationBootstrap() {
    console.log('Application bootstrapped');
    try {
      const result = await this.getWebhooks();
      if (result.data.length < 1) await this.createWebhook();
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * These are the required properties
   * @param {Object} data Data payload
   * @param {Object} data.attributes Payload attributes
   * @param {string} data.attributes.url The destination URL of the events that happened from your account. Please make sure that the URL is publicly accessible in order for you to receive the event.
   * @param {string[]} data.attributes.events The list of events to be sent to this webhook. Possible value in the meantime is source.chargeable.
   */
  createWebhook() {
    return this.paymongo.webhooks.create({
      data: {
        attributes: {
          url: 'http://localhost:3000/paymongo/payment-webhook',
          events: ['source.chargeable'],
        },
      },
    });
  }

  async getWebhooks() {
    const result = await this.paymongo.webhooks.list();
    return result;
  }

  /**
   * @param {string} id Webhook id
   */
  async getWebhook(id: string) {
    const result = await this.paymongo.webhooks.retrieve(id);
    return result;
  }

  /**
   * @param {string} id Webhook id
   * @param {string} action Toggle options 'enable' or 'disable'
   */
  async toggleWebhook(id: string, action: 'enable' | 'disable') {
    const result = await this.paymongo.webhooks.toggle(id, action);
    return result;
  }

  /**
   * These are the required properties
   * @param {Object} data The payload.
   * @param {Object} data.attributes Payload attributes.
   * @param {number} data.attributes.amount Amount to be collected by the PaymentIntent.
   * @param {string[]} data.attributes.payment_method_allowed The list of payment method types that the PaymentIntent is allowed to use. Possible value is card for now.
   * @param {string} data.attributes.currency Three-letter ISO currency code, in uppercase. PHP is the only supported currency as of the moment.
   */
  async createPaymentIntent(
    amount: number,
    paymentMethod = 'card',
  ): Promise<PaymentIntentResult> {
    const result = await this.paymongo.paymentIntents.create({
      data: {
        attributes: {
          amount: amount * 100, // convert to centavo
          currency: 'PHP',
          payment_method_allowed: [paymentMethod],
        },
      },
    });

    return {
      clientKey: result?.data?.attributes?.client_key,
    };
  }

  /**
   * @param {string} id PaymentIntent id
   */
  async getPaymentIntent(id: string) {
    const result = await this.paymongo.paymentIntents.retrieve(id);
    return result;
  }

  /**
   * These are the required properties
   * @param {Object} data The payload.
   * @param {Object} data.attributes Payload attributes.
   * @param {string} data.attributes.type The type of payment method. The possible value is card for now.
   * @param {string} data.attributes.details.card_number Credit/Debit Card number of the PaymentMethod.
   * @param {number} data.attributes.details.exp_month Expiry month of the Credit/Debit Card.
   * @param {number} data.attributes.details.exp_year Expiry year of the Credit/Debit Card.
   * @param {string} data.attributes.details.cvc CVC of the Credit/Debit Card.
   */
  async createPaymentMethod(
    cardNumber: string,
    expMonth: number,
    expYear: number,
    cvc: string,
  ) {
    const result = await this.paymongo.paymentMethods.create({
      data: {
        attributes: {
          type: 'card',
          details: {
            card_number: cardNumber,
            exp_month: expMonth,
            exp_year: expYear,
            cvc: cvc,
          },
        },
      },
    });

    return result;
  }

  /**
   * @param {string} id The PaymentMethod id
   */
  async getPaymentMethod(id: string) {
    const result = await this.paymongo.paymentMethods.retrieve(id);
    return result;
  }

  /**
   * These are the required properties
   * @param {string} id PaymentIntent id.
   * @param {Object} data The payload.
   * @param {Object} data.attributes Payload attributes.
   * @param {string} data.attributes.payment_method Id of PaymentMethod to attach to the PaymentIntent.
   */
  async attachPaymentIntent(
    id: string,
    paymentMethodId = 'pm_PvmSWoVu2NKfZrD6UNmNdcNR',
  ) {
    const result = await this.paymongo.paymentIntents.attach(id, {
      data: {
        attributes: {
          payment_method: paymentMethodId,
        },
      },
    });

    return result;
  }
}
