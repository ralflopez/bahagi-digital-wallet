import { ObjectType, Field, ID } from '@nestjs/graphql';
import { FundTransfer } from 'src/fund-transfers/entities/fund-transfer.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class InternalFundTransfer {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  readonly id: string;

  @ManyToOne(() => User, (user) => user.sentFund)
  @JoinColumn()
  @Field(() => User)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedFund)
  @JoinColumn()
  @Field(() => User)
  receiver: User;

  @OneToOne(() => FundTransfer)
  @JoinColumn()
  @Field(() => FundTransfer)
  details: FundTransfer;
}
