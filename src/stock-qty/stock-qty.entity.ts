import { Product } from "src/product/product.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity("stockQty")
export class StockQty{

    @PrimaryGeneratedColumn()
    id:number

   @OneToOne(()=>Product,{eager:true})
   @JoinColumn({name:"productId"})
    productId:Product
    
    @Column('int')
    currentQuantity:number
    
    @Column('date')
lastUpdated:Date

}