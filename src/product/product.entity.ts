import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("product")
export class Product{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:String

    @Column()
    sku:String

    @Column()
    category:string

    @Column()
    unit:string

    @Column('date')
    createdAt:Date



}