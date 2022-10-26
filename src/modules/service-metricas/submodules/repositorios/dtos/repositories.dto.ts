

import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { estadosReg, estadosRep } from 'src/modules/service-metricas/enums/global-enum';

export class CreateRepositoryDto {
  @IsNotEmpty()
  @IsNumber()
  readonly tribeId : number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEnum(estadosRep)
  readonly state: estadosRep;

  @IsNotEmpty()
  @IsEnum(estadosReg)
  readonly status:estadosReg;

  @IsOptional()
  readonly metricId:number;

}

export class UpdateRepositoryDto extends PartialType(CreateRepositoryDto) {}
