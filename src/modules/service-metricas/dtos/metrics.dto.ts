import { IsNumber, IsNotEmpty, IsPositive, IsOptional, Max } from 'class-validator';
import { ApiProduces, ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMetricsDto {
  @ApiProperty({
    description: 'Identificacion del Repositorio',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly id_repository: number;

  @ApiProperty({
    description: 'Covertura de los Repositorios',
    required: true,
  })
  @IsNotEmpty()
  @IsPositive()
  @IsOptional()
  @Max(100)
  readonly coverage: number;

  @ApiProperty({
    description: 'Bugs de los Repositorios',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly bugs: number;

  @ApiProperty({
    description: 'Vulnerabilidades de los Repositorios',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly vulnerabilities: number;

  @ApiProperty({
    description: 'Hostpot de los Repositorios',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly hostpot: number;

  @ApiProperty({
    description: 'Codigo de los Repositorios',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly code_smells: number;
}

@ApiProduces()
export class UpdateMetricsDto extends PartialType(CreateMetricsDto) { }
