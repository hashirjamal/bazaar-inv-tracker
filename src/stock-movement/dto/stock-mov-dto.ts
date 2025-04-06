import { IsNotEmpty } from "class-validator"
import { PrimaryGeneratedColumn } from "typeorm"


export class StockMovDto{

   @PrimaryGeneratedColumn()
    @IsNotEmpty()
    id:number
    
    @IsNotEmpty()
    productId:number
    
    @IsNotEmpty()
    
    type:String
   
    @IsNotEmpty()
    
    quantity:number
  
    note:String
    
    @IsNotEmpty()
    
    createdBy:String


}