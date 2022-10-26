import { Tribus } from "src/modules/service-metricas/submodules/tribus/entities/tribus.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organizaciones {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    name: string;

    @Column({ type: 'int' })
    status: number;

    @OneToMany(() => Tribus, (tribes) => tribes.organization)
    tribes: Tribus[]
}
