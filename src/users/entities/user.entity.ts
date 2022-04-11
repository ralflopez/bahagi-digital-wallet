import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
  phone_number: string;

  @Column()
  @Field(() => Role, { defaultValue: Role.USER })
  role: string = Role.USER;

  @Column('timestamptz')
  @Field(() => GraphQLISODateTime, {
    defaultValue: new Date(Date.now()),
  })
  createdAt: Date = new Date(Date.now());
}
