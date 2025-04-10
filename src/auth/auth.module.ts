import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports:[UserModule,JwtModule.register({secret:process.env.JWT_KEY})],
  providers: [AuthService,JWTStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
