import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
