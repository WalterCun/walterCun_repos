import { Organizaciones } from 'src/modules/admin-org/entities/organizaciones.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { Repositorios } from '../../repositorios/entities/repositories.entity';

@Entity()
export class Tribus {
  @PrimaryGeneratedColumn()
  id_tribe: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'int' })
  status: number;

  @OneToMany(() => Repositorios, (repos) => repos.tribu)
  repos: Repositorios[]

  @ManyToOne(() => Organizaciones, (organization) => organization.tribes)
  organization: Organizaciones
}
