import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Currency } from './currency.entity';

@Entity('country')
@ObjectType()
export class Country {
  // get id from https://flagicons.lipis.dev/
  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  name: string;

  @OneToOne(() => Currency)
  @JoinColumn()
  @Field(() => Currency)
  currency: Currency;

  @Column()
  @Field()
  mobileCode: string;
}
