import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Country } from 'src/countries/entities/country.entity';
import { Currency } from 'src/currencies/entities/currency.entity';
import { PaymentService } from 'src/payment-services/entities/payment-service.entity';
import { PaymentServiceMethod } from 'src/payment-services/enums/method.enum';
import { PaymentServiceType } from 'src/payment-services/enums/type.enum';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/users/enums/role.enum';
import { FundTransfer } from 'src/fund-transfers/entities/fund-transfer.entity';
import { ExternalFundTransfer } from 'src/external-fund-transfers/entities/external-fund-transfer.entity';
import { FundTransferStatus } from 'src/fund-transfers/enums/status.enum';
import { FundTransferType } from 'src/fund-transfers/enums/type.enum';
import { ExternalFundTransferMethod } from 'src/external-fund-transfers/enums/method.enum';
import { InternalFundTransfer } from 'src/internal-fund-transfers/entities/internal-fund-transfer.entity';

interface RepoEntittyPair {
  repo: Repository<any>;
  entity: any;
}

@Injectable()
export class SeedsService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
    @InjectRepository(Country) private countryRespository: Repository<Country>,
    @InjectRepository(PaymentService)
    private paymentServiceRepository: Repository<PaymentService>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(FundTransfer)
    private fundTransferRepository: Repository<FundTransfer>,
    @InjectRepository(ExternalFundTransfer)
    private externalFundTransferRepository: Repository<ExternalFundTransfer>,
    @InjectRepository(InternalFundTransfer)
    private internalFundTransfer: Repository<InternalFundTransfer>,
  ) {}

  async onApplicationBootstrap() {
    console.log('seeding db');
    await this.clearDatabase();

    const phpCurrency = await this.currencyRepository.save({
      id: 'PHP',
      name: 'Philippine Peso',
      symbol: '₱',
    });

    const phCountry = await this.countryRespository.save({
      currency: phpCurrency,
      id: 'ph',
      mobileCode: '+63',
      name: 'Philippines',
    });

    const [paymongo, gcash] = await this.paymentServiceRepository.save([
      {
        id: 'paymongo-paymongo-debit-credit',
        base_fee: 15,
        company: 'paymongo',
        method: PaymentServiceMethod.CASH_IN,
        minimum_fee: 0,
        percent_fee: 3.5,
        type: PaymentServiceType.SERVICE,
        name: 'paymongo-debit-credit',
      },
      {
        id: 'globe-gcash',
        base_fee: 25,
        company: 'globe',
        method: PaymentServiceMethod.CASH_OUT,
        minimum_fee: 0,
        percent_fee: 0,
        type: PaymentServiceType.SERVICE,
        name: 'gcash',
      },
    ]);

    const [user1, user2] = await this.userRepository.save([
      {
        id: uuid.v4(),
        country: phCountry,
        email: 'demo@email.com',
        name: 'demo',
        password: await this.generatePassword(),
        phoneNumber: '+631234567890',
        role: Role.USER,
        createdAt: new Date(Date.now()),
      },
      {
        id: uuid.v4(),
        country: phCountry,
        email: 'demo2@email.com',
        name: 'demo2',
        password: await this.generatePassword(),
        phoneNumber: '+631234567899',
        role: Role.USER,
        createdAt: new Date(Date.now()),
      },
    ]);

    // funds
    this.externalFundTransferRepository.save([
      {
        details: await this.fundTransferRepository.save({
          amount: 10000,
          currency: phpCurrency,
          fee: 365,
          status: FundTransferStatus.SUCCESS,
          type: FundTransferType.EXTERNAL,
        }),
        id: uuid.v4(),
        method: ExternalFundTransferMethod.CASH_IN,
        paymentService: paymongo,
        user: user1,
      },
      {
        details: await this.fundTransferRepository.save({
          amount: -100,
          currency: phpCurrency,
          fee: 25,
          status: FundTransferStatus.SUCCESS,
          type: FundTransferType.EXTERNAL,
        }),
        id: uuid.v4(),
        method: ExternalFundTransferMethod.CASH_OUT,
        paymentService: gcash,
        user: user1,
      },
    ]);

    await this.internalFundTransfer.save([
      {
        details: await this.fundTransferRepository.save({
          amount: 1000,
          currency: phpCurrency,
          fee: 0,
          id: uuid.v4(),
          status: FundTransferStatus.SUCCESS,
          type: FundTransferType.INTERNAL,
        }),
        id: uuid.v4(),
        receiver: user2,
        sender: user1,
      },
      {
        details: await this.fundTransferRepository.save({
          amount: 100,
          currency: phpCurrency,
          fee: 0,
          id: uuid.v4(),
          status: FundTransferStatus.SUCCESS,
          type: FundTransferType.INTERNAL,
        }),
        id: uuid.v4(),
        receiver: user1,
        sender: user2,
      },
    ]);
  }

  async clearDatabase() {
    const details: RepoEntittyPair[] = [
      {
        entity: InternalFundTransfer,
        repo: this.internalFundTransfer,
      },
      {
        entity: ExternalFundTransfer,
        repo: this.externalFundTransferRepository,
      },
      { entity: User, repo: this.userRepository },
      { entity: PaymentService, repo: this.paymentServiceRepository },
      { entity: Country, repo: this.countryRespository },
      { entity: Currency, repo: this.currencyRepository },
    ];

    details.forEach(async ({ repo, entity }) => {
      await this.deleteAll(repo, entity);
    });
  }

  async deleteAll(repo: Repository<any>, entity: any) {
    await repo.createQueryBuilder().delete().from(entity).execute();
  }

  async generatePassword() {
    const result = await bcrypt.hash('password', 10);
    return result;
  }
}
