import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './dto/user-dto';
import * as bcrypt from "bcryptjs"
import { LoginDTO } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

constructor(
    @InjectRepository(User) private userRepo: Repository<User>
    ,private jwtService : JwtService
){}


async createUser(body:UserDTO): Promise<User>{
    
    const salt = await bcrypt.genSalt()
    body.pass = await bcrypt.hash(body.pass, 3)

    let user = await this.userRepo.save({
        email:body.email, pass:body.pass
    })

    user.pass = ""
    return user;


}

async loginUser(body: LoginDTO) : Promise<{accessToken:string}>{
    const user = await this.userRepo.findOne({
        where: { email: body.email}
    })

   if(user){

       const passMatched = await bcrypt.compare(
           body.pass,
           user.pass
        )

        if (passMatched){
            user.pass = ""

            const payload = {email:user.email, sub:user.userId}
            return {
                accessToken: this.jwtService.sign(payload)
            };

        }
        else{
            throw new UnauthorizedException("Invalid Password")
        }
    }
    else{
        throw new UnauthorizedException("Invalid Email")
    }
}

}
