import { Test, TestingModule } from '@nestjs/testing';
import { BalancesResolver } from './balances.resolver';
import { BalancesService } from './balances.service';

describe('BalancesResolver', () => {
  let resolver: BalancesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalancesResolver, BalancesService],
    }).compile();

    resolver = module.get<BalancesResolver>(BalancesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
