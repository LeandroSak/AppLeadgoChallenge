import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    description : string

    @Column( {type : 'timestamp'})
    date : Date
}