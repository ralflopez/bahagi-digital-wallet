import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Currency } from 'src/currencies/entities/currency.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Currency, (currency) => currency.fundTransfers, {
    onDelete: 'SET NULL',
  })
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
}
