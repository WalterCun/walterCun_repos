import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

import { estadosReg, estadosRep } from 'src/modules/service-metricas/enums/global-enum';

export class CreateRepositoryDto {
  @ApiProperty({
    description: 'Identificacion de la Tribu',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly tribeId: number;

  @ApiProperty({
    description: 'Nombre de la Tribu',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ 
    description: 'Estado del Repositorio: E=ENABLED, D=DISABLED, A=ARCHIVE',
    enum: estadosRep,
    // enumName: 'Estados Repositorio'
  })
  @IsNotEmpty()
  @IsEnum(estadosRep)
  readonly state: estadosRep;

  @ApiProperty({ 
    description: 'Estado de Registro: A=ACTIVE, I=INACTIVE',
    enum: estadosReg,
    // enumName: 'Estados Registro'
  })
  @IsNotEmpty()
  @IsEnum(estadosReg)
  readonly status: estadosReg;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  readonly metricId: number;

}

export class UpdateRepositoryDto extends PartialType(CreateRepositoryDto) { }
