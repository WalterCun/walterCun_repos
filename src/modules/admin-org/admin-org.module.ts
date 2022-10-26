import { Module } from '@nestjs/common';
import { AdminOrgService } from './admin-org.service';
import { AdminOrgControllerCreate, AdminOrgControllerDelete, AdminOrgControllerGet, AdminOrgControllerUpdate } from './admin-org.controller';
import { Organizaciones } from './entities/admin-org.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Organizaciones])],
  controllers: [
    AdminOrgControllerCreate,
    AdminOrgControllerUpdate, 
    AdminOrgControllerDelete, 
    AdminOrgControllerGet],
  providers: [AdminOrgService],
  exports: [AdminOrgService]
})
export class AdminOrgModule {}
