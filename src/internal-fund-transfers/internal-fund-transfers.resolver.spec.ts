import { Test, TestingModule } from '@nestjs/testing';
import { InternalFundTransfersResolver } from './internal-fund-transfers.resolver';
import { InternalFundTransfersService } from './internal-fund-transfers.service';

describe('InternalFundTransfersResolver', () => {
  let resolver: InternalFundTransfersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternalFundTransfersResolver, InternalFundTransfersService],
    }).compile();

    resolver = module.get<InternalFundTransfersResolver>(InternalFundTransfersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
