import { Controller, Get } from '@nestjs/common';
import { StockQtyService } from './stock-qty.service';
import { StockQty } from './stock-qty.entity';

@Controller('stock-qty')
export class StockQtyController {

constructor(private stockQtyService :StockQtyService){}

@Get()
getAllQty(): Promise<StockQty[]>{
    return this.stockQtyService.fetch()
}

}
