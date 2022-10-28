import { ApiProduces, ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateAdminOrgDto {
    @ApiProperty({
        description: 'Identificacion de la Organizacion',
        required: true,
      })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({
        description: 'Estatus de la Organizacion',
        minimum: 0,
        required: true,
      })
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly status: number;
}

@ApiProduces()
export class UpdateAdminOrgDto extends PartialType(CreateAdminOrgDto) {}
