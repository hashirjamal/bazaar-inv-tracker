import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { Repository } from 'typeorm';
import { StockMovement } from './stock-movement.entity';
import { StockQty } from 'src/stock-qty/stock-qty.entity';
import { StockMovDto } from './dto/stock-mov-dto';
import { timestamp } from 'rxjs';

@Injectable()
export class StockMovementService {

    constructor(
        @InjectRepository(Product,"sqlite") private prodRepo: Repository<Product>,
        @InjectRepository(StockMovement,"sqlite") private stockMovRepo: Repository<StockMovement>,
        @InjectRepository(StockQty,"sqlite") private stockQtyRepo: Repository<StockQty>,

    ){    }


    async moveStock(stockBody: StockMovDto):Promise<StockMovement >{
        const prod = await this.prodRepo.findBy({id:stockBody.productId})

        if(prod.length !=0){
            let obj = {...stockBody, timestamp:Date.now()}
            const stockMov =  await this.stockMovRepo.save(obj)
            

           let stock = await this.stockQtyRepo.findOneBy({productId:stockBody.productId})


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
                        this.stockQtyRepo.update({productId:stockBody.productId},stock)
                return stockMov;
            }
            
            else{
                
                if(stockBody.type=="STOCK_IN"){
                    let dt =await this.stockQtyRepo.save({productId:stockBody.productId,currentQuantity:stockBody.quantity,lastUpdated:new Date() })
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
            

}
