import { Test, TestingModule } from '@nestjs/testing';
import { StockQtyController } from './stock-qty.controller';

describe('StockQtyController', () => {
  let controller: StockQtyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockQtyController],
    }).compile();

    controller = module.get<StockQtyController>(StockQtyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
