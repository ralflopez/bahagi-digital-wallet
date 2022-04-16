import { InputType, Field, Float } from '@nestjs/graphql';
import { Currency } from 'src/currencies/entities/currency.entity';
import { FundTransferStatus } from '../enums/status.enum';
import { FundTransferType } from '../enums/type.enum';

@InputType()
export class CreateFundTransferInput {
  @Field(() => Float)
  amount: number;

  @Field(() => Float)
  fee: number;

  @Field()
  currencyId: string;

  @Field(() => FundTransferStatus)
  status: FundTransferStatus;

  @Field(() => FundTransferType)
  type: FundTransferType;
}
