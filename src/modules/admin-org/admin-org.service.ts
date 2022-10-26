import { Injectable } from '@nestjs/common';
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

  searchByIdOrg(id: number) {
    return this.organizacionesRepo.findOneBy({id: id});
  }

  async updateByIdOrg(id: number, newdata: UpdateAdminOrgDto) {
    const org = await this.organizacionesRepo.findOneBy({id: id});
    this.organizacionesRepo.merge(org, newdata)
    return this.organizacionesRepo.findOneBy({id: id});
  }

  deleteByIdOrg(id: number) {
    return this.organizacionesRepo.delete(id);
  }
}
