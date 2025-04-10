import { IsAlpha, IsEmail, IsNotEmpty } from "class-validator";


export class LoginDTO{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    pass: string
}