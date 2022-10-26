import { Module } from '@nestjs/common';
import { FakeapiService } from './fakeapi.service';
import { FakeapiController } from './fakeapi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizaciones } from '../admin-org/entities/organizaciones.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Organizaciones])],
  controllers: [FakeapiController],
  providers: [FakeapiService]
})
export class FakeApiModule {}
