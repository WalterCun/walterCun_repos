import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FakeapiService } from './fakeapi.service';

@ApiTags('Ejercicio #1: Servicio simulado (Mock)')
@Controller('fakeapi')
export class FakeapiController {
  constructor(private readonly fakeapiService: FakeapiService) {}

  @Get()
  findAll() {
    return this.fakeapiService.findAll();
  }
 
}
