import { join } from 'path';
import type { Response } from 'express';
import { Controller, Get, Param, ParseIntPipe, Res, StreamableFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { createReadStream } from "fs";
import { RepositoriesService } from "./submodules/repositorios/services/repositories.service";


@ApiTags('Ejercicio #4 Generar reporte CSV metricas de repositorio')
@Controller('reporteria')
export class MetricasReporteriaController {
  constructor(private repositoriesService: RepositoriesService) { }

  @Get('export/:id')
  async getFile(@Param('id', ParseIntPipe) id: number,@Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
    await this.repositoriesService.generateReport(id)
    const file = createReadStream(join(process.cwd(), 'report.csv'));
    res.set({
      'Content-Type': 'text/plain',
      'Content-Disposition': 'attachment; filename="report.csv"',
    });
    return new StreamableFile(file);
  }
  
}


