import { registerEnumType } from '@nestjs/graphql';

export enum PaymongoStatus {
  'awaiting_payment_method',
  'awaiting_next_action',
  'processing',
  'succeeded',
}

registerEnumType(PaymongoStatus, { name: 'PaymongoStatus' });
