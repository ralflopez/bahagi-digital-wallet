import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Country } from 'src/countries/entities/country.entity';
import { FundTransfer } from 'src/fund-transfers/entities/fund-transfer.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('currency')
@ObjectType()
export class Currency {
  @PrimaryColumn()
  @Field(() => ID)
  readonly id: string;

  @Column({ unique: true })
  @Field()
  name: string;

  @Column({ unique: true })
  @Field()
  symbol: string;

  @OneToMany(() => FundTransfer, (fundTransfer) => fundTransfer.currency, {
    onDelete: 'NO ACTION',
  })
  fundTransfers: FundTransfer[];

  @OneToMany(() => Country, (country) => country.currency, {
    onDelete: 'SET NULL',
  })
  countries: Country[];
}
