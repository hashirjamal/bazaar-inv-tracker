import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User{

    @PrimaryGeneratedColumn()
    userId:number

    @Column()
    email:string
    
    @Column()
    @Exclude()
    pass:string

    
}