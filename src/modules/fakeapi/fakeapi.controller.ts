import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FakeapiService } from './fakeapi.service';

@Controller('fakeapi')
export class FakeapiController {
  constructor(private readonly fakeapiService: FakeapiService) {}

  @Get()
  findAll() {
    return this.fakeapiService.findAll();
  }
 
}
