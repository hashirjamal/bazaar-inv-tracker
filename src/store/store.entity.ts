import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("store")
export class Store{

@PrimaryGeneratedColumn()
storeId: number

@Column()
city: String

@Column()
address: String

@Column()
manager: String

}