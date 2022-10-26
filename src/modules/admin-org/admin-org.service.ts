import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminOrgDto } from './dto/create-admin-org.dto';
import { UpdateAdminOrgDto } from './dto/update-admin-org.dto';
import { Organizaciones } from './entities/admin-org.entity';

@Injectable()
export class AdminOrgService {

  constructor(
    @InjectRepository(Organizaciones) private organizacionesRepo:Repository<Organizaciones>,
  ){}
  
  // Metodo de creacion de Organizacion
  createNewOrg(data: CreateAdminOrgDto) {
    return this.organizacionesRepo.save(data);
  }

  // Metodo para traer las organizaciones existentes
  searchAllOrg() {
    return this.organizacionesRepo.find();
  }

  async searchByIdOrg(id: number) {
    const org = await this.organizacionesRepo.findOneBy({id:id});
    if (org == null) {
      throw new NotFoundException(`La organizacion #${id} no se encuentra`);
    }

    return org;
  }

  async updateByIdOrg(id: number, newdata: UpdateAdminOrgDto) {
    const org = await this.organizacionesRepo.findOneBy({id: id});
    if (org == null) {
      throw new NotFoundException(`La organizacion #${id} no se encuentra`);
    }

    this.organizacionesRepo.merge(org, newdata)
    return this.organizacionesRepo.save(org);
  }

  deleteByIdOrg(id: number) {
    return this.organizacionesRepo.delete(id);
  }
}
