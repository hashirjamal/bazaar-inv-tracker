import { Body, Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product-dto';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product,"sqlite") private prodRepo : Repository<Product>
    ){

    }

    insertProduct(prodData : ProductDto):Promise<Product>{
        let obj : any = {...prodData, createdAt:Date.now()}
        return this.prodRepo.save(obj)
    }

    fetchAll():Promise<Product[]>{
        return this.prodRepo.find();
    }

}
