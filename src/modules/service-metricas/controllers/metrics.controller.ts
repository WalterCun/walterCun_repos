import { Controller, Get, Param, Body, Post, Put, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';

import { MetricsService } from '../metrics.service';
import { CreateMetricsDto, UpdateMetricsDto } from '../dtos/metrics.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CRUD - Metricas')
@Controller('metricas')
export class MetricsController {
  constructor(private metricsService: MetricsService) { }

  @Get()
  getMetrics() {
    return this.metricsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.metricsService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateMetricsDto) {
    return this.metricsService.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateMetricsDto) {
    return this.metricsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.metricsService.remove(id);
  }

}
