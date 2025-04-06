import { IsNotEmpty, IsString } from "class-validator"


export class ProductDto{

     @IsString()
     @IsNotEmpty()
        title:String
    
        @IsString()
        @IsNotEmpty()
        sku:String
    
        @IsString()
        @IsNotEmpty()
        category:string
    
        @IsString()
        @IsNotEmpty()
        unit:string
    
      
    

}