
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy){
    
    constructor(){
        const secret = process.env.JWT_KEY || "muneer123"
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: secret
        })
    }
    
    validate(payload:any): unknown {
       return{
        userId:payload.sub, email:payload.email
       };
    }

}