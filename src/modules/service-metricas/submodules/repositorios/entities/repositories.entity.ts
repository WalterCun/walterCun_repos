import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne
} from 'typeorm';

import { Exclude, Expose } from "class-transformer";
import { Tribus } from '../../tribus/entities/tribus.entity'
import { estadosReg, estadosRep } from 'src/modules/service-metricas/enums/global-enum';
import { Metricas } from 'src/modules/service-metricas/entities/metrics.entity';


@Entity()
export class Repositorios {
  @PrimaryGeneratedColumn()
  id_repository: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  //@Column({ type: "enum", enum: repoStates , default: repoStates.ENABLE })
  @Column({ type: 'varchar', length: 1, default: estadosRep.ENABLE })
  state: estadosRep;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_time: Date;
  
  @Column({ type: 'varchar', length: 1, default: estadosReg.ACTIVE })
  //@Column({ type: "enum",enum: registerStates , default: registerStates.ACTIVE })
  status: estadosReg;

  @OneToOne(() => Metricas,(metrica) => metrica.repository)
  @JoinColumn()
  metricas: Metricas

  @ManyToOne(() => Tribus, (tribu) => tribu.repos)
  tribus: Tribus

}
