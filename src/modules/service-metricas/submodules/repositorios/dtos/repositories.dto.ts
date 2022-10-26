

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { estadosReg, estadosRep } from 'src/modules/service-metricas/enums/global-enum';

export class CreateRepositoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly tribeId : number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(estadosRep)
  readonly state: estadosRep;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(estadosReg)
  readonly status:estadosReg;

  @ApiProperty()
  @IsOptional()
  readonly metricId:number;

}

export class UpdateRepositoryDto extends PartialType(CreateRepositoryDto) {}
