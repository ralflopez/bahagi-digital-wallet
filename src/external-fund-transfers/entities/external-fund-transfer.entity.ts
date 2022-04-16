import { ObjectType, Field, ID } from '@nestjs/graphql';
import { FundTransfer } from 'src/fund-transfers/entities/fund-transfer.entity';
import { PaymentService } from 'src/payment-services/entities/payment-service.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ExternalFundTransferMethod } from '../enums/method.enum';

@Entity()
@ObjectType()
export class ExternalFundTransfer {
  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @OneToOne(() => FundTransfer, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Field(() => FundTransfer)
  details: FundTransfer;

  @ManyToOne(() => User, (user) => user.externalFundTransfers)
  @Field(() => User)
  user: User;

  @ManyToOne(
    () => PaymentService,
    (paymentService) => paymentService.externalFundTransfers,
  )
  paymentService: PaymentService;

  @Column({
    type: 'enum',
    enum: ExternalFundTransferMethod,
  })
  @Field(() => ExternalFundTransferMethod)
  method: ExternalFundTransferMethod;
}
