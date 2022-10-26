import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Metricas } from "./metricas.entity";
import { Tribu } from "./tribu.entity";



@Entity('repositorio')
export class Repositorio {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: "varchar", nullable: false })
    name: string;

    @Column({ type: "varchar", nullable: false })
    state: string;

    @CreateDateColumn({ type: 'timestamp', nullable: false })
    create_time: Date;

    @Column({ type: "varchar" })
    status: string;

    @OneToMany((type) => Metricas, (metrica) => metrica.repositorio)
    metricas: Metricas[];

    @ManyToOne(type => Tribu, tribu => tribu.repos, { cascade: true })
    @JoinColumn({ name: "tribu_id" })
    tribu: Tribu;

}