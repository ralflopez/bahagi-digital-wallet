import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { ExternalFundTransfer } from 'src/external-fund-transfers/entities/external-fund-transfer.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PaymentServiceType } from '../enums/type.enum';

@Entity('payment_service')
@ObjectType()
export class PaymentService {
  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  company: string;

  @Column()
  @Field()
  name: string;

  @Column({
    type: 'enum',
    enum: PaymentServiceType,
  })
  @Field(() => PaymentServiceType)
  type: PaymentServiceType;

  @Column('float')
  @Field(() => Float)
  percent_fee: number;

  @Column('float')
  @Field(() => Float)
  minimum_fee: number;

  @Column('float', { default: 0 })
  @Field(() => Float, { defaultValue: 0 })
  base_fee: number = 0;

  @OneToMany(
    () => ExternalFundTransfer,
    (externalFundTransfer) => externalFundTransfer.paymentService,
  )
  externalFundTransfers: ExternalFundTransfer[];
}