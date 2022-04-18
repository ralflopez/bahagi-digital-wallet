import { Test, TestingModule } from '@nestjs/testing';
import { InternalFundTransfersService } from './internal-fund-transfers.service';

describe('InternalFundTransfersService', () => {
  let service: InternalFundTransfersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternalFundTransfersService],
    }).compile();

    service = module.get<InternalFundTransfersService>(
      InternalFundTransfersService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
