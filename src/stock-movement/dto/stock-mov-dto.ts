import { IsNotEmpty } from "class-validator"
import { PrimaryGeneratedColumn } from "typeorm"


export class StockMovDto{

   
    
    @IsNotEmpty()
    productId:number
    
    @IsNotEmpty()
    storeId:number
    
    @IsNotEmpty()
    
    type:String
   
    @IsNotEmpty()
    
    quantity:number
  
    note:String
    
    @IsNotEmpty()
    
    createdBy:String


}