import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockQty } from './stock-qty.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StockQtyService {

    constructor(@InjectRepository(StockQty) private stockQtyRepo: Repository<StockQty>){}

    async fetch():Promise<StockQty[]>{
        return await this.stockQtyRepo.find()
    }
}
