import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Currency } from 'src/currencies/entities/currency.entity';
import { ExternalFundTransfer } from 'src/external-fund-transfers/entities/external-fund-transfer.entity';
import { InternalFundTransfer } from 'src/internal-fund-transfers/entities/internal-fund-transfer.entity';
import { PaymentService } from 'src/payment-services/entities/payment-service.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FundTransferStatus } from '../enums/status.enum';
import { FundTransferType } from '../enums/type.enum';

@Entity()
@ObjectType()
export class FundTransfer {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  readonly id: string;

  @Column('float')
  @Field(() => Float)
  amount: number;

  @Column('float')
  @Field(() => Float)
  fee: number;

  @ManyToOne(() => Currency)
  @JoinColumn()
  @Field(() => Currency)
  currency: Currency;

  @Column({
    type: 'enum',
    enum: FundTransferStatus,
  })
  @Field(() => FundTransferStatus)
  status: FundTransferStatus;

  @Column({
    type: 'enum',
    enum: FundTransferType,
  })
  type: FundTransferType;

  @OneToOne(() => ExternalFundTransfer, (e) => e.details, {
    onDelete: 'CASCADE',
  })
  externalFundTransfer: ExternalFundTransfer;

  @OneToOne(() => InternalFundTransfer, (i) => i.details, {
    onDelete: 'CASCADE',
  })
  internalFundTransfer: InternalFundTransfer;
}
