import { IsNotEmpty, IsString } from "class-validator"


export class StoreDto{

@IsNotEmpty()
@IsString()
city: String
    
@IsNotEmpty()
@IsString()
address: String
    
@IsNotEmpty()
@IsString()
manager: String

}