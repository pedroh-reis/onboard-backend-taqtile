import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    name: string

    @Column("text")
    email: string

    @Column("text")
    password: string

    @Column("text")
    birthDate: string
}
