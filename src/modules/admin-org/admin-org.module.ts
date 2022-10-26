import { Module } from '@nestjs/common';
import { AdminOrgService } from './admin-org.service';
import { AdminOrgController } from './admin-org.controller';
import { Organizaciones } from './entities/organizaciones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Organizaciones])],
  controllers: [
    AdminOrgController, 
  ],
  providers: [AdminOrgService],
  exports: [AdminOrgService]
})
export class AdminOrgModule {}
