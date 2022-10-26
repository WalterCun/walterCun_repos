import {  Controller,  Get,  Query,  Param,  Body,  Post,  Put,  Delete,  HttpCode,  HttpStatus, ParseIntPipe} from '@nestjs/common';

import { TribesService } from './tribes.service';
import { CrearTribuDto, UpdateTribeDto } from './dtos/tribes.dto';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';

// @ApiExcludeController()
@ApiTags('CRUD - Tribus')
@Controller('tribus')
export class TribesController {
  constructor(private tribesService: TribesService) { }

  @Get()
  getTribues() {
    return this.tribesService.findAll();
  }
  //aquí
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.tribesService.findOne(id);
  }

  @Post()
  create(@Body() data: CrearTribuDto) {
    return this.tribesService.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateTribeDto) {
    return this.tribesService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.tribesService.remove(id);
  }

}
