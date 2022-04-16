import { Test, TestingModule } from '@nestjs/testing';
import { FundTransfersService } from './fund-transfers.service';

describe('FundTransfersService', () => {
  let service: FundTransfersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FundTransfersService],
    }).compile();

    service = module.get<FundTransfersService>(FundTransfersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
