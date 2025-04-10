import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

console.log(process.env.JWT_KEY)
@Module({
  imports:[TypeOrmModule.forFeature([User]),JwtModule.register({
    secret:"muneer123",
    signOptions:{
      expiresIn:'1d'
    }
  })],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
