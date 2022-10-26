import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organizaciones {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @Column({ type: 'int' })
    status: number;
}
