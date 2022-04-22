import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Country } from 'src/countries/entities/country.entity';
import { ExternalFundTransfer } from 'src/external-fund-transfers/entities/external-fund-transfer.entity';
import { InternalFundTransfer } from 'src/internal-fund-transfers/entities/internal-fund-transfer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity('user')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  readonly id: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  @Field(() => Role, { defaultValue: Role.USER })
  role: Role = Role.USER;

  @Column('timestamptz')
  @Field(() => GraphQLISODateTime, {
    defaultValue: new Date(Date.now()),
  })
  createdAt: Date = new Date(Date.now());

  @OneToMany(
    () => ExternalFundTransfer,
    (externalFundTransfer) => externalFundTransfer.user,
  )
  externalFundTransfers: ExternalFundTransfer[];

  @ManyToOne(() => Country, { onDelete: 'NO ACTION' })
  @JoinColumn()
  @Field(() => Country)
  country: Country;

  @OneToMany(
    () => InternalFundTransfer,
    (internalFundTransfer) => internalFundTransfer.sender,
  )
  sentFund: InternalFundTransfer[];

  @OneToMany(
    () => InternalFundTransfer,
    (internalFundTransfer) => internalFundTransfer.receiver,
  )
  receivedFund: InternalFundTransfer[];

  // @OneToMany(() => Transaction, )transaction => transaction.user
  // @Field(() => [Transaction])
  // transactions: Transaction[];
}
