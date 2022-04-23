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

  @ManyToOne(() => User, { onDelete: 'NO ACTION' })
  @JoinColumn()
  @Field(() => User)
  sender: User;

  @ManyToOne(() => User, { onDelete: 'NO ACTION' })
  @JoinColumn()
  @Field(() => User)
  receiver: User;

  @OneToOne(() => FundTransfer, (f) => f.internalFundTransfer, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  @Field(() => FundTransfer)
  details: FundTransfer;
}
