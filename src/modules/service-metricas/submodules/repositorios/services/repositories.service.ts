import { Injectable, NotFoundException, Inject, StreamableFile, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, Between } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';


import { Repositorios } from '../entities/repositories.entity'
import { CreateRepositoryDto, UpdateRepositoryDto } from '../dtos/repositories.dto';

import { TribuService } from '../../tribus/tribes.service'
import { estadosRep } from 'src/modules/service-metricas/enums/global-enum';
import { ModelResponse } from 'src/modules/service-metricas/interfaces/models.interface';


@Injectable()
export class RepositoriesService {
  generateReport(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Repositorios) private reposRepo: Repository<Repositorios>,
    private tribesService: TribuService,
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

}
