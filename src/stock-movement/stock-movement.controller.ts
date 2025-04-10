import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { StockMovement } from './stock-movement.entity';
import { StockMovDto } from './dto/stock-mov-dto';
import { StockMovementService } from './stock-movement.service';
import { JwtAuthGuard } from 'src/auth/jwt-guard';

@Controller('stock-movement')
export class StockMovementController {


    constructor(
        private stockMovService : StockMovementService
    ){}

    @Post()
    @UseGuards(JwtAuthGuard)
    createMovement(@Body() body: StockMovDto):Promise<StockMovement>{
        return this.stockMovService.moveStock(body);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getAllMovement(
        @Query("page") page:number = 1,
        @Query("limit") limit:number = 10,
        @Query("store") store:number = 0,
        @Query("date") date:string|null = null,


    ){
        return this.stockMovService.fetchAllMov(page,limit,store,date)
    }

    @Get(":id")
    @UseGuards(JwtAuthGuard)
    trackMovement(
        @Param("id", new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})) id: number
    ){
        return this.stockMovService.fetchOneMov(id)
    }

}
