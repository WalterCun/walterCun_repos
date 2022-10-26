import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminOrgService } from './admin-org.service';
import { CreateAdminOrgDto } from './dto/create-admin-org.dto';
import { UpdateAdminOrgDto } from './dto/update-admin-org.dto';

@ApiTags('Ejercicio #2: Administracion de organizaciones')
@Controller('admin-org')
export class AdminOrgController {
  constructor(private readonly service: AdminOrgService) {}

  @Post('crear/')
  create(@Body() createAdminOrgDto: CreateAdminOrgDto) {
    return this.service.createNewOrg(createAdminOrgDto);
  }

  @Patch('actualizar/:orgId')
  path(@Param('orgId') id: string, @Body() newData: UpdateAdminOrgDto) {
    return this.service.updateByIdOrg(+id, newData);
  }

  @Put('actualizar/:orgId')
  update(@Param('orgId', ParseIntPipe) orgId: number, @Body() newData: UpdateAdminOrgDto) {
    return this.service.updateByIdOrg(orgId, newData);
  }

  @Get('obtener/')
  findAll() {
    return this.service.searchAllOrg();
  }

  @Get('obtener/:orgId')
  findById(@Param('orgId', ParseIntPipe) orgId: number) {
    return this.service.searchByIdOrg(orgId);
  }

  @Delete('borrar/:orgId')
  delete(@Param('orgId', ParseIntPipe) orgId: number) {
    return this.service.deleteByIdOrg(orgId);
  }

}
