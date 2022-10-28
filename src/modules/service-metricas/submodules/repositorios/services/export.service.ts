import { HttpService } from "@nestjs/axios";
import { Injectable, NotFoundException } from "@nestjs/common";
import * as fs from 'fs';
import { TribuService } from "../../tribus/tribes.service";
import { estadosRep } from 'src/modules/service-metricas/enums/global-enum';
import { ModelResponse } from 'src/modules/service-metricas/interfaces/models.interface';
import { InjectRepository } from "@nestjs/typeorm";
import { Repositorios } from "../entities/repositories.entity";
import { Between, MoreThan, Repository } from "typeorm";

@Injectable()
export class ExportService{
    constructor(
        @InjectRepository(Repositorios) private reposRepo: Repository<Repositorios>,
        private tribuService: TribuService,
        private readonly httpService: HttpService
    ){}

    async getVerificationState(idRepos: number) {
    let resp: string = 'Servidor no levantado'
    const codes = [
      { code: 604, state: "Verificado" },
      { code: 605, state: "En espera" },
      { code: 606, state: "Aprobado" },
    ]

    try {     
      const APIFake: any = await this.httpService.get(`http://localhost:3999/repositories`).toPromise()
      const dataFake: any = APIFake.data      
      const searchFake: number = dataFake?.find((repo) => repo.id == idRepos)?.state || 0;
      resp = codes.find((code) => code.code == searchFake)?.state || "No encontrado"
      console.log('State '+resp);
      
    } catch (error) {
      resp = 'Sin conexion al servidor'
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
    const tribus = await this.tribuService.findOne(tribuId);
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
        console.log(metric);
        
        const stateRepo = await this.getVerificationState(metric.id_repository)
        
        let datamodel: ModelResponse = {
          id: metric.id_repository,
          name: metric.name,
          tribu: metric.tribus.name,
          organizacion: metric.tribus.organization.name,
          coverage: `${metric.metricas.coverage}%`,
          codeSmells: +metric.metricas.code_smells,
          bugs: +metric.metricas.bugs,
          vulnerabilities: +metric.metricas.vulnerabilities,
          hotspots: +metric.metricas.hostpot,
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
    metricas.map((item: { id: any; name: any; tribu: any; organizacion: any; coverage: any; codeSmells: any; bugs: any; vulnerabilities: any; hotspots: any; verificationState: any; state: any; }) => {
      w.write(`${item.id},${item.name},${item.tribu},${item.organizacion},${item.coverage},${item.codeSmells},${item.bugs},${item.vulnerabilities},${item.hotspots},${item.verificationState},${item.state}\n`)
    })

    return csvExport

  }

}