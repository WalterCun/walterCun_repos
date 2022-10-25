import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('organizacion')
export class id_organizacion {

    @PrimaryGeneratedColumn('increment')
    id_organizacion: number

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ nullable: false })
    status: number;

}