import { ObjectType, Field, ID } from '@nestjs/graphql';
import { FundTransfer } from 'src/fund-transfers/entities/fund-transfer.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class InternalFundTransfer {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  readonly id: string;

  @OneToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  sender: User;

  @OneToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  receiver: User;

  @OneToOne(() => FundTransfer)
  @JoinColumn()
  @Field(() => FundTransfer)
  details: FundTransfer;
}
