import { IsNotEmpty } from "class-validator"
import { PrimaryGeneratedColumn } from "typeorm"

enum MovType{
    STOCK_IN = "STOCK_IN",
    SALE = "SALE",
    MANUAL_REMOVAL = "MANUAL_REMOVAL"
}


export class StockMovDto{

   
    
    @IsNotEmpty()
    productId:number
    
    @IsNotEmpty()
    storeId:number
    
    @IsNotEmpty()
    
    type: MovType
   
    @IsNotEmpty()
    
    quantity:number
  
    note:String
    
    @IsNotEmpty()
    
    createdBy:String


}