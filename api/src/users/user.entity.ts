import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Optional} from "@nestjs/common";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    login: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    refreshToken: string;
}
