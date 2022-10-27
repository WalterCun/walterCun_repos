import { Column, Entity,PrimaryColumn ,OneToOne,} from 'typeorm';
import { Repositorios } from '../submodules/repositorios/entities/repositories.entity';


@Entity()
export class Metricas {
  @PrimaryColumn()
  id_repository: number;

  @Column({type: "decimal", precision: 2, default: 0})
  coverage: number

  @Column({ type: 'int' })
  bugs: number;

  @Column({ type: 'int' })
  vulnerabilities: number;

  @Column({ type: 'int' })
  hostpot: number;

  @Column({ type: 'int' })
  code_smells: number;

  @OneToOne(() => Repositorios, (repository) => repository.metricas) // specify inverse side as a second parameter
  repository: Repositorios

}
