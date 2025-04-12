import { IsNotEmpty, IsString } from "class-validator"

enum Qty{
        PCS="PCS",
        KGS="KGS",
        LTRS = "LTRS"
}

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
        unit: Qty
}
    
      
    

