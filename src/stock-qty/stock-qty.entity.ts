import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity("stockQty")
export class StockQty{

    @PrimaryColumn('int')
    
    productId:number
    
    @Column('int')
    currentQuantity:number
    
    @Column('date')
lastUpdated:Date

}