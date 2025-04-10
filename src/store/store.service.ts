import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { Repository } from 'typeorm';
import { StoreDto } from './dto/store-dto';

@Injectable()
export class StoreService {

    constructor(
        @InjectRepository(Store) private storeRepo : Repository<Store>
    ){}

    createStore(body: StoreDto):Promise<Store>{
        return this.storeRepo.save(body);
    }

}
