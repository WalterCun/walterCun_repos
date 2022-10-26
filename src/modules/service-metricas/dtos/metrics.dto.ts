import { IsNumber, IsNotEmpty, IsPositive, IsOptional, Max } from 'class-validator';
import { ApiProduces, ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMetricsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly id_repository: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsOptional()
  @Max(100)
  readonly coverage: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly bugs: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly vulnerabilities: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly hostpot: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly code_smells: number;
}

@ApiProduces()
export class UpdateMetricsDto extends PartialType(CreateMetricsDto) { }
