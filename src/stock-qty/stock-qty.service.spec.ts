import { Test, TestingModule } from '@nestjs/testing';
import { StockQtyService } from './stock-qty.service';

describe('StockQtyService', () => {
  let service: StockQtyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockQtyService],
    }).compile();

    service = module.get<StockQtyService>(StockQtyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
