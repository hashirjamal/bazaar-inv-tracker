import { Product } from "src/product/product.entity"
import { Store } from "src/store/store.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"


@Entity("StockMovement")
export class StockMovement{
    
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(() => Product, { eager: true })
    @JoinColumn({ name: "productId" })
    product: Product;

    @Column()
    type:String
    

    @Column('int')
    quantity:number

    @Column('date')
    timestamp:Date

    @Column()
    note:String

    @Column()
    createdBy:String

    @ManyToOne(()=>Store,{eager:true})
    @JoinColumn()
    store: Store
}