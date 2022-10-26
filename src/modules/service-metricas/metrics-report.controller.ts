import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  StreamableFile,
  Res
} from '@nestjs/common';

import { createReadStream } from 'fs';


import { ApiTags } from '@nestjs/swagger';
import { RepositoriesService } from './submodules/repositorios/services/repositories.service';

@ApiTags('Ejercicio #3 Servicio para obtener las metricas de un repositorio')
@Controller('reporteria')
export class RepositoriesMetricController {
  constructor(private repositoriesService: RepositoriesService) { }

  @Get('metricas/:tribuId')
  @HttpCode(HttpStatus.ACCEPTED)
  getMetrics(@Param('tribuId', ParseIntPipe) tribuId: number) {
    return this.repositoriesService.getMetrics(tribuId);
  }
  
}
