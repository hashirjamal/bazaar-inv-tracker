import { Module } from '@nestjs/common';
import { StockQtyService } from './stock-qty.service';
import { StockQtyController } from './stock-qty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockQty } from './stock-qty.entity';

@Module({
  imports:[TypeOrmModule.forFeature([StockQty])],
  providers: [StockQtyService],
  controllers: [StockQtyController]
})
export class StockQtyModule {}
