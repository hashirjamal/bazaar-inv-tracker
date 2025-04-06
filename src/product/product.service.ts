import { Body, Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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

    fetchById(id:number): Promise<Product | null>{
        return this.prodRepo.findOneBy({id})
    }
    update(id:number,body:ProductDto): Promise<UpdateResult>{
        return this.prodRepo.update({id},body)
    }
    delete(id:number): Promise<DeleteResult>{
        return this.prodRepo.delete(id)
    }

    

}
