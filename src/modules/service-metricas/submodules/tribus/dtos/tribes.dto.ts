import { IsString, IsNumber, IsNotEmpty, IsPositive, } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CrearTribuDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly status: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly idOrganization: number
}

export class UpdateTribeDto extends PartialType(CrearTribuDto) { }
