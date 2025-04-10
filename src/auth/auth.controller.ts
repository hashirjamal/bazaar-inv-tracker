import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from 'src/user/dto/login-dto';
import { UserDTO } from 'src/user/dto/user-dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {

constructor(
    private userService: UserService
){}


@Post('signup')

signup(@Body() body: UserDTO) : Promise<User>{
    return this.userService.createUser(body)
}

@Post('login')

login(@Body() body:LoginDTO): Promise<{accessToken:string}>{
    return this.userService.loginUser(body)
}



}