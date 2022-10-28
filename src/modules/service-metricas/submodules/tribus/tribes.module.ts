import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TribesController } from './tribus.controller';
import { TribuService } from './tribes.service';
import { Tribus } from './entities/tribus.entity';
import { AdminOrgModule } from 'src/modules/admin-org/admin-org.module';


@Module({
  imports: [AdminOrgModule,TypeOrmModule.forFeature([Tribus])],
  controllers: [TribesController],
  providers: [TribuService],
  exports: [TribuService]
})
export class TribusModule {}
