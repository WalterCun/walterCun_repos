import { IsString, IsNumber, IsNotEmpty, IsPositive, } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CrearTribuDto {
  @ApiProperty({
    description: 'Nombre de la Tribu',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  
  @ApiProperty({
    description: 'Estatus de la Tribu',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly status: number;

  @ApiProperty({
    description: 'Identificacion de la Organizacion',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly idOrganization: number
}

export class UpdateTribeDto extends PartialType(CrearTribuDto) { }
