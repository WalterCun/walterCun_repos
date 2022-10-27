import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminOrgService } from './admin-org.service';
import { CreateAdminOrgDto, UpdateAdminOrgDto } from './dto/org.dto';

@ApiTags('Ejercicio #2: Administracion de organizaciones')
@Controller('admin-org')
export class AdminOrgController {
  constructor(private readonly service: AdminOrgService) {}

  @Post('crear/')
  create(@Body() createAdminOrgDto: CreateAdminOrgDto) {
    return this.service.createNewOrg(createAdminOrgDto);
  }

  @Patch('actualizar/:id')
  path(@Param('id') id: string, @Body() newData: UpdateAdminOrgDto) {
    return this.service.updateByIdOrg(+id, newData);
  }

  @Put('actualizar/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() newData: UpdateAdminOrgDto) {
    return this.service.updateByIdOrg(id, newData);
  }

  @Get('obtener/')
  findAll() {
    return this.service.searchAllOrg();
  }

  @Get('obtener/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.searchByIdOrg(id);
  }

  @Delete('borrar/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteByIdOrg(id);
  }

}
