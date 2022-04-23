import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Currency } from '../../currencies/entities/currency.entity';

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

  @ManyToOne(() => Currency)
  @JoinColumn()
  @Field(() => Currency)
  currency: Currency;

  @Column()
  @Field()
  mobileCode: string;
}
