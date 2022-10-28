import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepositoriesController } from './repositories.controller';

import { RepositoriesService } from './services/repositories.service';
import { Repositorios } from './entities/repositories.entity';
import { TribusModule } from '../tribus/tribes.module'
import { Tribus } from '../tribus/entities/tribus.entity'
import { HttpModule} from '@nestjs/axios';
import { RepositoriesMetricController } from '../../metrics-report.controller';
import { ExportService } from './services/export.service';

@Module({
  imports: [HttpModule, TribusModule, TypeOrmModule.forFeature([Repositorios, Tribus])],
  controllers: [RepositoriesController, RepositoriesMetricController],
  providers: [RepositoriesService, HttpModule,ExportService],
  exports: [RepositoriesService,ExportService]
})
export class RepositoriosModule { }
