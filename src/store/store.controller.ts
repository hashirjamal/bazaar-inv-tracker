import { Body, Controller, Post } from '@nestjs/common';
import { StoreDto } from './dto/store-dto';
import { StoreService } from './store.service';
import { Store } from './store.entity';

@Controller('store')
export class StoreController {

constructor(
    private storeService: StoreService
){}

@Post() 
postStore(
    @Body() body: StoreDto
): Promise<Store>{
    return this.storeService.createStore(body)
}


}
