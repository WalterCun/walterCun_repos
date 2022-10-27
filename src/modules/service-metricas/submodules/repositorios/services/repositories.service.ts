import { Injectable, NotFoundException, Inject, StreamableFile, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository, MoreThan, Between } from 'typeorm';
import { HttpModule, HttpService } from '@nestjs/axios';
import * as fs from 'fs';


import { Repositorios } from '../entities/repositories.entity'
import { CreateRepositoryDto, UpdateRepositoryDto } from '../dtos/repositories.dto';

import { TribesService } from '../../tribus/tribes.service'
import { estadosRep } from 'src/modules/service-metricas/enums/global-enum';


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
    const verificationCode = [
      { code: 604, state: "Verificado" },
      { code: 605, state: "En espera" },
      { code: 606, state: "Aprobado" },
    ]

    try {
      const APIMock: any = await this.httpService.get('fake/').toPromise()
      const dataMock: any = APIMock.data
      const searchMock: number = dataMock?.find((repo) => repo.id == idRepos)?.state || 0
      resp = verificationCode.find((code) => code.code == searchMock)?.state || "No encontrado"
    } catch (error) {
      resp = 'NO_API'
    }

    return resp;
  }

  async getMetrics(idTribu: number) {

    interface ModelResponse {
      id: number; name: string; tribe: string; organization: string;
      coverage: string; codeSmells: number; bugs: number; vulnerabilities: number; hotspots: number;
      verificationState: string; state: string;
    }

    const stateCode = [
      { code: "E", state: "Enable" },
      { code: "D", state: "Disable" },
      { code: "A", state: "Archived" },
    ]

    const minCoverage: number = 75;
    const thisYear: number = new Date().getFullYear()
    const dateFrom: Date = new Date(thisYear, 1, 1)
    const dateTo: Date = new Date(thisYear, 12, 31)


    const tribe = await this.tribesService.findOne(idTribu);
    console.log(tribe);


    if (!tribe) {
      throw new NotFoundException(`La Tribu no se encuentra registrada`);
    }

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
          id_tribe: idTribu,
        },
        metricas: {
          coverage: MoreThan(minCoverage),
        },
        state: estadosRep.ENABLE,
      }
    })

    if (!metricas) {
      throw new NotFoundException(`La Tribu no tiene repositorios que cumplan con la cobertura necesaria`);
    }

    var modelResponse: ModelResponse[] = [];
    await Promise.all(
      metricas.map(async repo => {
        const data = JSON.parse(JSON.stringify(repo));
        const stateRepo = await this.getVerificationState(data.id_repository)
        let datamodel: ModelResponse = {
          id: data.id_repository,
          name: data.name,
          tribe: data.tribe.name,
          organization: data.tribe.organization.name,
          coverage: `${data.metrics.coverage}%`,
          codeSmells: +data.metrics.code_smells,
          bugs: +data.metrics.bugs,
          vulnerabilities: +data.metrics.vulnerabilities,
          hotspots: +data.metrics.hostpot,
          verificationState: stateRepo,
          state: stateCode.find((code) => code.code == data.state)?.state,
        }
        modelResponse.push(datamodel)
      }))

    const response = JSON.parse(JSON.stringify(modelResponse))
    return response
  }

  // Metodo para generar reporte local
  async generateReport(idTribu: number) {

    const report: string = `informe-tribu${idTribu}.csv`;
    const w = fs.createWriteStream(report, { flags: 'w' })

    //Escribir encabezados
    w.write(`id,Nombre Repositorio,Tribu,Organización,coverage,codeSmells,bugs,vulnerabilities,hotspots,verificationState,state\n`)

    // Recuperar metricas
    const metrics: any = await this.getMetrics(idTribu) || [];
    metrics.map((item: { id: any; name: any; tribe: any; organization: any; coverage: any; codeSmells: any; bugs: any; vulnerabilities: any; hotspots: any; verificationState: any; state: any; }) => {
      w.write(`${item.id},${item.name},${item.tribe},${item.organization},${item.coverage},${item.codeSmells},${item.bugs},${item.vulnerabilities},${item.hotspots},${item.verificationState},${item.state}\n`)
    })

    return report

  }

}
