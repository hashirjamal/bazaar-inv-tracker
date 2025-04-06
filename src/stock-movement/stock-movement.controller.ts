import { Body, Controller, Post } from '@nestjs/common';
import { StockMovement } from './stock-movement.entity';
import { StockMovDto } from './dto/stock-mov-dto';
import { StockMovementService } from './stock-movement.service';

@Controller('stock-movement')
export class StockMovementController {


    constructor(
        private stockMovService : StockMovementService
    ){}

    @Post()

    createMovement(@Body() body: StockMovDto):Promise<StockMovement>{
        return this.stockMovService.moveStock(body);
    }

}
