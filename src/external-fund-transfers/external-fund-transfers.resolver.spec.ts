import { Test, TestingModule } from '@nestjs/testing';
import { ExternalFundTransfersResolver } from './external-fund-transfers.resolver';
import { ExternalFundTransfersService } from './external-fund-transfers.service';

describe('ExternalFundTransfersResolver', () => {
  let resolver: ExternalFundTransfersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalFundTransfersResolver, ExternalFundTransfersService],
    }).compile();

    resolver = module.get<ExternalFundTransfersResolver>(ExternalFundTransfersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
