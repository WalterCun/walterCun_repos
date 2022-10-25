import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FakeController } from 'src/apps/fake/apifake.controller';
import { AppDataSource } from 'src/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, FakeController],
  providers: [AppService],
})
export class AppModule {
}
