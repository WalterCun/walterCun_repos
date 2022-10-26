import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Tribu } from "./tribu.entity";

@Entity('organizacion')
export class Organizacion {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ length: 75, nullable: false })
    name: string;

    @Column({ nullable: false })
    status: number;

    @OneToMany(() => Tribu, (tribu) => tribu.organizacion)
    tribu: Tribu[];
}