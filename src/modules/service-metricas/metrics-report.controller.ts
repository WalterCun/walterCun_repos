import { Controller, Get, Param, HttpCode, HttpStatus, ParseIntPipe, } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ExportService } from './submodules/repositorios/services/export.service';


@ApiTags('Ejercicio #3 Servicio para obtener las metricas de un repositorio')
@Controller('reporteria')
export class RepositoriesMetricController {
  constructor(private repositoriesService: ExportService) { }

  @Get('metricas/:tribuId')
  @HttpCode(HttpStatus.ACCEPTED)
  getMetrics(@Param('tribuId', ParseIntPipe) tribuId: number) {
    return this.repositoriesService.getMetricas(tribuId);
  }

}
