import { Injectable } from '@nestjs/common';
import { CreateAdminOrgDto } from './dto/create-admin-org.dto';
import { UpdateAdminOrgDto } from './dto/update-admin-org.dto';

@Injectable()
export class AdminOrgService {
  create(createAdminOrgDto: CreateAdminOrgDto) {
    return 'This action adds a new adminOrg';
  }

  findAll() {
    return `This action returns all adminOrg`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminOrg`;
  }

  update(id: number, updateAdminOrgDto: UpdateAdminOrgDto) {
    return `This action updates a #${id} adminOrg`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminOrg`;
  }
}
