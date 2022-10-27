import { Controller, Get, Query, Param, Body, Post, Put, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';

import { RepositoriesService } from './services/repositories.service';
import { CreateRepositoryDto, UpdateRepositoryDto } from './dtos/repositories.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CRUD - Repositorios')
@Controller('repositorios')
export class RepositoriesController {
  constructor(private reposService: RepositoriesService) { }

  @Get()
  getRepositories() {
    return this.reposService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.reposService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateRepositoryDto) {
    return this.reposService.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateRepositoryDto) {
    return this.reposService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.reposService.remove(id);
  }

}
