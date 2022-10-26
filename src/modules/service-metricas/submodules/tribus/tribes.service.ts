import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tribus } from './entities/tribus.entity'
import { CrearTribuDto,UpdateTribeDto} from './dtos/tribes.dto';
import { AdminOrgService } from 'src/modules/admin-org/admin-org.service';
import printErrorNoFound from 'src/modules/control';

@Injectable()
export class TribesService {
  constructor(
    @InjectRepository(Tribus) private tribeRepo:Repository<Tribus>,
    private organizationsService:AdminOrgService
  ){}


 async create(data: CrearTribuDto) {
    const newTribe = this.tribeRepo.create(data);
    const organization = await this.organizationsService.searchByIdOrg(data.idOrganization);
    if (!organization) {
      throw new NotFoundException(`Repository #${data.idOrganization} not found`);
    }
    newTribe.organization =organization;
    return this.tribeRepo.save(newTribe);
  }

  findAll() {
    //return this.organizations;
    return this.tribeRepo.find({
      relations: ['organization','repositories'],
    });
  }

  async findOne(id_tribe: number) {
    const tribe = await this.tribeRepo.findOne({
      where:{id_tribe: id_tribe},
      relations:['organization','repositories']
    });

    return tribe;
  }

  async update(id_tribe: number, changes: UpdateTribeDto) {
    const tribe = await this.tribeRepo.findOneBy({
      id_tribe: id_tribe
  });
  if (!tribe) {
    throw new NotFoundException(printErrorNoFound('Tribu',id_tribe));
  }
    this.tribeRepo.merge(tribe, changes);
    return this.tribeRepo.save(tribe);
  }

  remove(id: number) {
    return this.tribeRepo.delete(id);
  }
}
