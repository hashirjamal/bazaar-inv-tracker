import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';


@Module({
    imports:[TypeOrmModule.forFeature([Product])],
    providers:[ProductService],
  controllers: [ProductController],
  exports:[]
})
export class ProductModule {}
