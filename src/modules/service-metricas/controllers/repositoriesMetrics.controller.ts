// import { Controller, Get, Param, HttpCode, HttpStatus, ParseIntPipe, StreamableFile, Res } from '@nestjs/common';

// import { createReadStream } from 'fs';


// import { join } from 'path';
// import type { Response } from 'express';

// import { RepositoriesService } from '../submodules/repositorios/services/repositories.service';

// // @ApiTags('Ejercicio 4: Generar Reporte CSV metricas repositorio')
// @Controller('reportes')
// export class RepositoriesMetricController {
//   constructor(private repositoriesService: RepositoriesService) { }

//   @Get('generar/reporte/:tribuId')
//   async getFile(@Param('tribuId', ParseIntPipe) tribuId: number, @Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
//     await this.repositoriesService.generateReport(tribuId)
//     const file = createReadStream(join(process.cwd(), `informe-tribu${tribuId}.csv`));
//     res.set({
//       'Content-Type': 'text/plain',
//       'Content-Disposition': `attachment; filename="informe-tribu${tribuId}.csv"`,
//     });
//     return new StreamableFile(file);
//   }

//   @Get(':tribuId')
//   @HttpCode(HttpStatus.ACCEPTED)
//   getMetrics(@Param('tribuId', ParseIntPipe) tribuId: number) {
//     return this.repositoriesService.getMetrics(tribuId);
//   }
// }
