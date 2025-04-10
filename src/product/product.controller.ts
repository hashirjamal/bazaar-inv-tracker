import { Body, Controller, Post,Get, ParseIntPipe, HttpStatus, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ProductDto } from './dto/product-dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { DeleteResult, UpdateResult } from 'typeorm';

import { JwtAuthGuard } from 'src/auth/jwt-guard';

@Controller('product')

export class ProductController {

constructor(
    private prodService : ProductService
){

}

    @Post()
    @UseGuards(JwtAuthGuard)
    insert(@Body() prodBody: ProductDto) : Promise<Product>{
        
        return this.prodService.insertProduct(prodBody);
        
    }
    
    
    @Get()
    
    @UseGuards(JwtAuthGuard)
    getAll(): Promise<Product[]>{
        
        return this.prodService.fetchAll();
    }
    
    @Get(":id")
    
    @UseGuards(JwtAuthGuard)
    getOne( @Param('id', new ParseIntPipe(
        {errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}
    )) 
    id: number) : Promise<Product | null>{
        return this.prodService.fetchById(id)
    }
    
    
    @Put(":id")
    @UseGuards(JwtAuthGuard)
    
    update( @Param('id', new ParseIntPipe(
        {errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}
    )) 
    id: number, @Body() body:ProductDto) :Promise<UpdateResult>{
        return this.prodService.update(id,body)
    }
    
    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    delete(@Param('id',new ParseIntPipe({
        errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE
    })) id: number): Promise<DeleteResult> {
        return this.prodService.delete(id)
    }

}
