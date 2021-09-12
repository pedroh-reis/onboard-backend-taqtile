import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class UserEntity {
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
