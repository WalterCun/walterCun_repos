import { Module } from '@nestjs/common';
import { AdminOrgService } from './admin-org.service';
import { AdminOrgController } from './admin-org.controller';

@Module({
  controllers: [AdminOrgController],
  providers: [AdminOrgService]
})
export class AdminOrgModule {}
