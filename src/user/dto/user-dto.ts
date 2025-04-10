import { IsAlphanumeric, IsEmail, IsNotEmpty } from "class-validator";


export class UserDTO{

    @IsEmail()
    @IsNotEmpty()
    email:string
    
    @IsNotEmpty()
    @IsAlphanumeric()
    pass:string
}