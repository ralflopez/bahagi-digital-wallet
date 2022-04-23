import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Country } from 'src/countries/entities/country.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Country)
  @JoinColumn()
  @Field(() => Country)
  country: Country;
}
