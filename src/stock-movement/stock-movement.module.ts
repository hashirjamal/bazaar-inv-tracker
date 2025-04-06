import { Module } from '@nestjs/common';
import { StockMovementController } from './stock-movement.controller';
import { StockMovementService } from './stock-movement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockMovement } from './stock-movement.entity';
import { StockQty } from 'src/stock-qty/stock-qty.entity';
import { Product } from 'src/product/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([StockMovement,StockQty,Product],"sqlite")],
  controllers: [StockMovementController],
  providers: [StockMovementService]
})
export class StockMovementModule {}
