import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Repositorio } from "./repositorio.entity";

@Entity('metricas')
export class Metricas {


    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false })
    coverage: number;

    @Column({ nullable: false })
    bugs: number;

    @Column({ nullable: false })
    vulnerabilits: number;

    @Column({ nullable: false })
    hostpost: number;

    @Column({ nullable: false })
    codesmell: number;

    @ManyToOne(type => Repositorio, repo => repo.metricas, { cascade: true })
    @JoinColumn({ name: "repo_id" })
    repositorio: Repositorio;

}

