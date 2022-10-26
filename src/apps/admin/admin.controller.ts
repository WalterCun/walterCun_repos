import { Body, Controller, Post } from "@nestjs/common";
import { Organizacion } from "src/modules/entitys/organizacion.entity";
import { CrearOrganizacionData } from "./interface/organizacion.interface";

import { OrganizacionServices } from "./organizacion.services";


@Controller('administracion')
export class OrganizacionController{
    constructor(private readonly service: OrganizacionServices){};


@Post()
    createOrganizacion(@Body() data: Organizacion): Promise<Organizacion> {
        return this.service.createOrganizacion(data);
    }

}