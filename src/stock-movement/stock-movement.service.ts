import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { Between, Equal, Repository } from 'typeorm';
import { StockMovement } from './stock-movement.entity';
import { StockQty } from 'src/stock-qty/stock-qty.entity';
import { StockMovDto } from './dto/stock-mov-dto';
import { timestamp } from 'rxjs';
import { Store } from 'src/store/store.entity';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class StockMovementService {

    constructor(
        @InjectRepository(Product) private prodRepo: Repository<Product>,
        @InjectRepository(StockMovement) private stockMovRepo: Repository<StockMovement>,
        @InjectRepository(StockQty) private stockQtyRepo: Repository<StockQty>,
        @InjectRepository(Store) private storeRepo : Repository<Store>,
        private eventsGateway : EventsGateway
    ){    }


    async moveStock(stockBody: StockMovDto):Promise<StockMovement >{
        const prod = await this.prodRepo.findBy({id:stockBody.productId})

        if(prod.length !=0){

            const store = await this.storeRepo.findOneBy({storeId:stockBody.storeId})

            const storeId = +stockBody.storeId
            const productId  = +stockBody.productId
            
            let body2 = {...stockBody}

            // delete body2['productId']
        
            // delete body2['storeId']
            body2['store'] = storeId
            body2['product'] = productId


            let obj = {timestamp: new Date(),...body2}
            console.log(obj)
            const stockMov =  await this.stockMovRepo.save(obj)
            

           let stock = await this.stockQtyRepo.findOneBy({productId:prod[0]})


           if(stock){

               switch(stockBody.type){
                   
                   case 'STOCK_IN':
                       stock.currentQuantity+=stockBody.quantity
                       break;    
                       
                    case 'SALE':
                        stock.currentQuantity-=stockBody.quantity
                        if(stock.currentQuantity<0){ 
                            await this.stockMovRepo.delete(stockMov.id)
                            throw new HttpException('Insufficient Quantity',HttpStatus.BAD_REQUEST)}
                        break;    
                        
                    case 'MANUAL_REMOVAL':
                        stock.currentQuantity=0
                        break;    
                               
                               
                        }

                        stock.lastUpdated= new Date()
                        await   this.stockQtyRepo.update(stockBody.productId,stock)
                        const qty = await this.stockQtyRepo.findOneBy({productId:prod[0]})

                        
                        if(qty && qty.currentQuantity<10){
                            this.eventsGateway.emitEvent('lowStock',{message:"Low stock",qty})
                        }

                return stockMov;
            }
            
            else{
                
                if(stockBody.type=="STOCK_IN"){
                    let dt =await this.stockQtyRepo.save({productId:prod[0],currentQuantity:stockBody.quantity,lastUpdated:new Date() })
                    console.log(dt)
                    return stockMov;
                }
                else{
                        await this.stockMovRepo.delete(stockMov.id)
                        throw new HttpException('Insufficient Qunatity',HttpStatus.BAD_REQUEST)

                    }


                }

                }
                else{
                    throw new HttpException('Product Not found',HttpStatus.NOT_FOUND)
                }
            }
            

    fetchAllMov(page: number,limit:number,store:number,date:string | null): Promise<StockMovement[]>{

        let skip = (page-1)*limit
        let take = limit>100 ? 100 : limit

        let options = {}

        if(store>0){
            options['store'] = Equal(store)
        }

        if(date){
            let range = date.split(",")
            if(range.length==1){
                let dt = new Date(range[0])
                options['timestamp'] = Equal(dt)
            }
            else{
                let dt1 = new Date(range[0])
                let dt2 = new Date(range[1])

                options['timestamp'] = Between(dt1,dt2)
            }
        }


        return this.stockMovRepo.find({where:options,skip,take,order:{id:'ASC'}});    
    }

    fetchOneMov(id:number): Promise<StockMovement | null>{
        return this.stockMovRepo.findOneBy({id})
    }

}
