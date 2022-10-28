import { Injectable, NotFoundException, Inject, StreamableFile, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, Between } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';


import { Repositorios } from '../entities/repositories.entity'
import { CreateRepositoryDto, UpdateRepositoryDto } from '../dtos/repositories.dto';

import { TribesService } from '../../tribus/tribes.service'
import { estadosRep } from 'src/modules/service-metricas/enums/global-enum';
import { ModelResponse } from 'src/modules/service-metricas/interfaces/models.interface';
import axios from 'axios';


@Injectable()
export class RepositoriesService {
  constructor(
    @InjectRepository(Repositorios) private reposRepo: Repository<Repositorios>,
    private tribesService: TribesService,
    private readonly httpService: HttpService
  ) { }


  async create(data: CreateRepositoryDto) {
    const newRepository = this.reposRepo.create(data);
    if (data.tribeId) {
      const tribe = await this.tribesService.findOne(data.tribeId);
      newRepository.tribus = tribe;
    } else {
      throw new NotFoundException(`tribeId is required`);
    }
    return this.reposRepo.save(newRepository);
  }

  findAll() {
    return this.reposRepo.find({
      relations: ['tribus', 'metricas'],
    });
  }

  async findOne(id_repository: number) {
    const repository = await this.reposRepo.findOne({
      where: { id_repository: id_repository },
      relations: ['tribus', 'metricas']
    });
    if (!repository) {
      throw new NotFoundException(`Repository #${id_repository} not found`);
    }
    return repository;
  }



  async update(id_repository: number, changes: UpdateRepositoryDto) {
    const repository = await this.reposRepo.findOneBy({
      id_repository: id_repository
    });
    if (!repository) {
      throw new NotFoundException(`Repository #${id_repository} not found`);
    }
    if (changes.tribeId) {
      const tribe = await this.tribesService.findOne(changes.tribeId);
      repository.tribus = tribe;
    }

    this.reposRepo.merge(repository, changes);
    return this.reposRepo.save(repository);
  }

  remove(id: number) {
    return this.reposRepo.delete(id);
  }

  async getVerificationState(idRepos: number) {
    let resp: string = 'No encontrado'
    const codes = [
      { code: 604, state: "Verificado" },
      { code: 605, state: "En espera" },
      { code: 606, state: "Aprobado" },
    ]

    try {     
      const APIMock: any = await this.httpService.get(`http://localhost:3999/repositories`).toPromise()
      const dataMock: any = APIMock.data
      const searchMock: number = dataMock?.find((repo) => repo.id == idRepos)?.state || 0
      resp = codes.find((code) => code.code == searchMock)?.state || "No encontrado"
    } catch (error) {
      resp = 'FAIL'
    }

    return resp;
  }

  async getMetricas(tribuId: number) {

    // const stateCode = estadosRep
    const stateCode = [
      { code: "E", state: "Enable" },
      { code: "D", state: "Disable" },
      { code: "A", state: "Archived" },
    ]

    const minCoverage: number = 75;
    const dateYear: number = new Date().getFullYear()
    const dateFrom: Date = new Date(dateYear, 1, 1)
    const dateTo: Date = new Date(dateYear, 12, 31)

    // Consutar informacion de Tribu
    const tribus = await this.tribesService.findOne(tribuId);
    console.log(tribus);
    


    if (!tribus) {
      throw new NotFoundException(`La Tribu no se encuentra registrada`);
    }

    // Consultar informacion de Metricas
    const metricas: Repositorios[] = await this.reposRepo.find({
      relations: ['tribus', 'metricas', 'tribus.organization'],
      select: {
        id_repository: true,
        name: true,
        tribus: {
          name: true,
          organization: {
            name: true,
          }
        },
        metricas: {
          coverage: true,
          code_smells: true,
          bugs: true,
          vulnerabilities: true,
          hostpot: true,
        },
        state: true,
        create_time: true,
      },
      where: {
        create_time: Between(dateFrom, dateTo),
        tribus: {
          id_tribe: tribuId,
        },
        metricas: {
          coverage: MoreThan(minCoverage),
        },
        state: estadosRep.ENABLE,
      }
    })
    console.log(metricas);

    if (!metricas) {
      throw new NotFoundException(`La Tribu no tiene repositorios que cumplan con la cobertura necesaria`);
    }

    // Crear Modelo de Respuesta 
    let modelResp: ModelResponse[] = [];
    await Promise.all(
      metricas.map(async repo => {
        const metric = JSON.parse(JSON.stringify(repo));
        
        const stateRepo = await this.getVerificationState(metric.id_repository)
        console.log(stateRepo);
        
        let datamodel: ModelResponse = {
          id: metric.id_repository,
          name: metric.name,
          tribu: tribus.name,
          organizacion: metric.organization.name,
          coverage: `${metric.metrics.coverage}%`,
          codeSmells: +metric.metrics.code_smells,
          bugs: +metric.metrics.bugs,
          vulnerabilities: +metric.metrics.vulnerabilities,
          hotspots: +metric.metrics.hostpot,
          verificationState: stateRepo,
          state: stateCode.find((code) => code.code == metric.state)?.state,
        }
        modelResp.push(datamodel)
      }))

    const response = JSON.parse(JSON.stringify(modelResp))
    return response
  }

  // Metodo para generar reporte local
  async generateReport(idTribu: number) {

    const csvExport: string = `informe-tribu-n${idTribu}.csv`;
    const w = fs.createWriteStream(csvExport, { flags: 'w' })

    //Escribir encabezados
    w.write(`id,Nombre Repositorio,Tribu,Organizacion,coverage,codeSmells,bugs,vulnerabilities,hotspots,verificationState,state\n`)

    // Recuperar metricas
    const metricas: any = await this.getMetricas(idTribu) || [];
    console.log(metricas)
    
    // Escribir metricas
    metricas.map((item: { id: any; name: any; tribe: any; organization: any; coverage: any; codeSmells: any; bugs: any; vulnerabilities: any; hotspots: any; verificationState: any; state: any; }) => {
      w.write(`${item.id},${item.name},${item.tribe},${item.organization},${item.coverage},${item.codeSmells},${item.bugs},${item.vulnerabilities},${item.hotspots},${item.verificationState},${item.state}\n`)
    })

    return csvExport

  }

}
