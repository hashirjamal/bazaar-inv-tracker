import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { StockMovementModule } from './stock-movement/stock-movement.module';
import { StockQtyModule } from './stock-qty/stock-qty.module';
import { StockMovement } from './stock-movement/stock-movement.entity';
import { StockQty } from './stock-qty/stock-qty.entity';
import { StoreModule } from './store/store.module';
import { Store } from './store/store.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    synchronize:true,
    entities: [Product,StockMovement,StockQty,Store,User],
  }),
  ThrottlerModule.forRoot({
    throttlers:[
      {
        ttl:60000,
        limit:10
      }
    ]
  })
  ,
  ProductModule,
  StockMovementModule,
  StockQtyModule,
  StoreModule,
  UserModule,
  AuthModule,
],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_GUARD,
    useClass:ThrottlerGuard
  }],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    // console.log(dataSource.driver);
    // console.log(process.env)
    }
}
