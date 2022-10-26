import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { AdminOrgService } from './admin-org.service';
import { CreateAdminOrgDto } from './dto/create-admin-org.dto';
import { UpdateAdminOrgDto } from './dto/update-admin-org.dto';

@Controller('admin-org/create')
export class AdminOrgControllerCreate {
  constructor(private readonly service: AdminOrgService) {}

  @Post()
  create(@Body() createAdminOrgDto: CreateAdminOrgDto) {
    return this.service.createNewOrg(createAdminOrgDto);
  }
}

@Controller('admin-org/actualizar')
export class AdminOrgControllerUpdate{
  constructor(private readonly service: AdminOrgService) {}

  @Patch(':orgId')
  path(@Param('orgId') id: string, @Body() newData: UpdateAdminOrgDto) {
    return this.service.updateByIdOrg(+id, newData);
  }

  @Put(':orgId')
  update(@Param('orgId', ParseIntPipe) orgId: number, @Body() newData: UpdateAdminOrgDto) {
    return this.service.updateByIdOrg(orgId, newData);
  }

}

@Controller('admin-org/obtener')
export class AdminOrgControllerGet{
  constructor(private readonly service: AdminOrgService) {}
  @Get()
  findAll() {
    return this.service.searchAllOrg();
  }

  @Get(':orgId')
  findById(@Param('orgId', ParseIntPipe) orgId: number) {
    return this.service.searchByIdOrg(orgId);
  }

}

@Controller('admin-org/eliminar')
export class AdminOrgControllerDelete{
  constructor(private readonly service: AdminOrgService) {}

  @Delete(':orgId')
  delete(@Param('orgId', ParseIntPipe) orgId: number) {
    return this.service.deleteByIdOrg(orgId);
  }
}