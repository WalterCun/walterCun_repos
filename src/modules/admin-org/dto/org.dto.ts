import { ApiProduces, ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateAdminOrgDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly status: number;
}

@ApiProduces()
export class UpdateAdminOrgDto extends PartialType(CreateAdminOrgDto) {}
