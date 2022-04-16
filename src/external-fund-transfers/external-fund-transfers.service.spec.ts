import { Test, TestingModule } from '@nestjs/testing';
import { ExternalFundTransfersService } from './external-fund-transfers.service';

describe('ExternalFundTransfersService', () => {
  let service: ExternalFundTransfersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalFundTransfersService],
    }).compile();

    service = module.get<ExternalFundTransfersService>(
      ExternalFundTransfersService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
