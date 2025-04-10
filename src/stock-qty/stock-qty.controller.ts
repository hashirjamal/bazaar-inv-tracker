import { Controller, Get, UseGuards } from '@nestjs/common';
import { StockQtyService } from './stock-qty.service';
import { StockQty } from './stock-qty.entity';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
// import { JwtAuthGuard } from 'src/auth/jwt-guard';

@Controller('stock-qty')
export class StockQtyController {

constructor(private stockQtyService :StockQtyService){}

@Get()
@UseGuards(JwtAuthGuard)
getAllQty(): Promise<StockQty[]>{
    return this.stockQtyService.fetch()
}

}
