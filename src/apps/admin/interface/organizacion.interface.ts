import { IsNumber, IsObject, IsString } from "class-validator";
import { Tribu } from "src/modules/entitys/tribu.entity";

export class CrearOrganizacionData {

    @IsString()
    readonly name: string;

    @IsNumber()
    readonly status: number;

    @IsObject()
    readonly tribu: Partial<Tribu>;

}