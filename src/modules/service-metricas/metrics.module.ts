import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MetricsController } from './controllers/metrics.controller';
import { MetricsService } from './metrics.service';
import { Metricas } from './entities/metrics.entity';
import { RepositoriosModule } from './submodules/repositorios/repositorios.module';
import { Tribus } from './submodules/tribus/entities/tribus.entity';
import { MetricasReporteriaController } from './metrics-export.controller';


@Module({
  imports: [RepositoriosModule,TypeOrmModule.forFeature([Metricas,Tribus])],
  controllers: [MetricsController,MetricasReporteriaController],
  providers: [MetricsService],
  exports: [MetricsService]

})
export class MetricsModule {}
