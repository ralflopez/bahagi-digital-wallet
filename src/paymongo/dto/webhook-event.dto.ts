export interface PaymongoWebhookEventData {
  id: string;
  type: string;
  attributes: {
    type: string;
    livemode: false;
    data: {
      id: string;
      type: string;
      attributes: {
        access_url: unknown;
        amount: number;
        balance_transaction_id: string;
        billing: unknown;
        currency: string;
        description: unknown;
        disputed: false;
        external_reference_number: unknown;
        fee: number;
        foreign_fee: number;
        livemode: boolean;
        net_amount: number;
        origin: string;
        payment_intent_id: string;
        payout: unknown;
        source: {
          id: string;
          type: string;
          brand: string;
          country: string;
          last4: string;
        };
        statement_descriptor: string;
        status: string;
        tax_amount: unknown;
        refunds: unknown[];
        taxes: unknown[];
        available_at: number;
        created_at: number;
        paid_at: number;
        updated_at: number;
      };
    };
    previous_data: unknown;
    created_at: number;
    updated_at: number;
  };
}

export class WebhookEventDto {
  data: PaymongoWebhookEventData;
}
