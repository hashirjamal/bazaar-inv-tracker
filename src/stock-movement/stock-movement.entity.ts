import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity("StockMovement")
export class StockMovement{
    
    @PrimaryGeneratedColumn()
    id:number

    @Column()

    productId:number

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
}