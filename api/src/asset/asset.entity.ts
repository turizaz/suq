import {Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {AssetStatus} from "./asset.model";

@Entity()
export class AssetEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: AssetStatus
}
