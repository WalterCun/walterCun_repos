import { join } from 'path';
import type { Response } from 'express';
import { Controller, Get, Param, ParseIntPipe, Res, StreamableFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { createReadStream } from "fs";
import { RepositoriesService } from "./submodules/repositorios/services/repositories.service";
import { ExportService } from './submodules/repositorios/services/export.service';


@ApiTags('Ejercicio #4 Generar reporte CSV metricas de repositorio')
@Controller('reporteria')
export class MetricasReporteriaController {
  constructor(private repositoriesService: ExportService) { }

  @Get('export/:id')
  async getFile(@Param('id', ParseIntPipe) id: number,@Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
    // Crear fichero de datos CSV.
    await this.repositoriesService.generateReport(id);
    // Craer Stream de datos para descarga.
    const file = createReadStream(join(process.cwd(), `informe-tribu-n${id}.csv`));
    // Especificar el arvhico que se va a transmirir en la respuesta del enpoint
    res.set({
      'Content-Type': 'text/plain',
      'Content-Disposition': `attachment; filename="informe-tribu-n${id}.csv"`,
    });
    return new StreamableFile(file);
  }
  
}


