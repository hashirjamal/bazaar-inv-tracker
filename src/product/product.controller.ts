import { Body, Controller, Post,Get } from '@nestjs/common';
import { ProductDto } from './dto/product-dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')

export class ProductController {

constructor(
    private prodService : ProductService
){

}

    @Post()

    insert(@Body() prodBody: ProductDto) : Promise<Product>{

        return this.prodService.insertProduct(prodBody);

    }


    @Get()

    getAll(): Promise<Product[]>{

        return this.prodService.fetchAll();
    }


}
