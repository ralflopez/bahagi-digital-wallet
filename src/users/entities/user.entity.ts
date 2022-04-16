import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Country } from 'src/countries/entities/country.entity';
import { ExternalFundTransfer } from 'src/external-fund-transfers/entities/external-fund-transfer.entity';
import {
  Column,
  Entity,
  JoinColumn,
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

  @OneToOne(() => Country)
  @JoinColumn()
  @Field(() => Country)
  country: Country;

  // @OneToMany(() => Transaction, )transaction => transaction.user
  // @Field(() => [Transaction])
  // transactions: Transaction[];
}
