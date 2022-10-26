import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organizaciones } from '../admin-org/entities/organizaciones.entity';

@Injectable()
export class FakeapiService {

  constructor(
    @InjectRepository(Organizaciones) private organizacionesRepo:Repository<Organizaciones>,
  ){}

  async findAll() {
    let nOrg = (await this.organizacionesRepo.find()).length;
    let json = {"repositories": [{"id": 1,"state": 604}, {"id": 2,"state": 605}, {"id": 3,"state": 606}]
    }
    if(nOrg > 3){
      for (let index = 3; index < nOrg; index++) {
        json.repositories.push({id:index, state: json.repositories[index-3].state})
      }
    }

    return json;
  }


}
