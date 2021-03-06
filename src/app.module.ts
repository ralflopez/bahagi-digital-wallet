import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { GQLContext } from './graphql/types';
import { CountriesModule } from './countries/countries.module';
import { Country } from './countries/entities/country.entity';
import { Currency } from './currencies/entities/currency.entity';
import { CurrenciesModule } from './currencies/currencies.module';
import { PaymentService } from './payment-services/entities/payment-service.entity';
import { PaymentServicesModule } from './payment-services/payment-services.module';
import { FundTransfersModule } from './fund-transfers/fund-transfers.module';
import { InternalFundTransfer } from './internal-fund-transfers/entities/internal-fund-transfer.entity';
import { InternalFundTransfersModule } from './internal-fund-transfers/internal-fund-transfers.module';
import { FundTransfer } from './fund-transfers/entities/fund-transfer.entity';
import { ExternalFundTransfersModule } from './external-fund-transfers/external-fund-transfers.module';
import { ExternalFundTransfer } from './external-fund-transfers/entities/external-fund-transfer.entity';
import { PaymongoController } from './paymongo/paymongo.controller';
import { PaymongoModule } from './paymongo/paymongo.module';
import { BalancesModule } from './balances/balances.module';
import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req, res }): GQLContext => ({ req, res }),
      cors: {
        origin: [
          'http://localhost:3000',
          'https://studio.apollographql.com',
          process.env.BASE_URL,
          '*',
        ],
        credentials: true,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'user',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'db',
      synchronize: true,
      ssl: process.env.NODE_ENV === 'production' ? true : false,
      extra:
        process.env.NODE_ENV === 'production'
          ? {
              ssl: {
                rejectUnauthorized: false,
              },
            }
          : null,
      entities: [
        User,
        Country,
        Currency,
        PaymentService,
        FundTransfer,
        InternalFundTransfer,
        ExternalFundTransfer,
      ],
    }),
    UsersModule,
    AuthModule,
    CurrenciesModule,
    CountriesModule,
    PaymentServicesModule,
    FundTransfersModule,
    InternalFundTransfersModule,
    ExternalFundTransfersModule,
    PaymongoModule,
    BalancesModule,
    SeedsModule,
  ],
  controllers: [AppController, PaymongoController],
  providers: [AppService],
})
export class AppModule {}
