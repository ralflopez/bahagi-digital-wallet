import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
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

  @ManyToOne(() => Currency, { onDelete: 'SET NULL', cascade: true })
  @JoinColumn()
  @Field(() => Currency)
  currency: Currency;

  @Column()
  @Field()
  mobileCode: string;

  @OneToMany(() => User, (user) => user.country, {
    onDelete: 'SET NULL',
    cascade: true,
  })
  users: User[];
}
