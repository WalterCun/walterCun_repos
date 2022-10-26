import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Organizacion } from "./organizacion.entity";
import { Repositorio } from "./repositorio.entity";

@Entity('tribu')
export class Tribu {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ nullable: false })
    status: number;

    @OneToMany((type) => Repositorio, (repos) => repos.tribu)
    repos: Repositorio[];

    @ManyToOne((type) => Organizacion, (org) => org.tribu, { cascade: true })
    @JoinColumn({ name: "organizacion_id" })
    organizacion: Organizacion;


}