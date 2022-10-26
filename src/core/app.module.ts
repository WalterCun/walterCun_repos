import { Module } from '@nestjs/common';

// import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminModule } from 'src/apps/admin/admin.module';
import { FakeApiModule } from 'src/apps/fake/fake.module';



@Module({
  imports: [
    FakeApiModule,
    AdminModule
  ],
})
export class AppModule {}
