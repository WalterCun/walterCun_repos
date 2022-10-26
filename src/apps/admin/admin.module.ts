import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { AppDataSource } from "src/core/db/datasource";

import { Organizacion } from "src/modules/entitys/organizacion.entity";
import { Tribu } from "src/modules/entitys/tribu.entity";
import { OrganizacionController } from "./admin.controller";
import { OrganizacionServices } from "./organizacion.services";

@Module({
    imports: [
        TypeOrmModule.forRootAsync(AppDataSource),
        TypeOrmModule.forFeature([Organizacion]),
        TypeOrmModule.forFeature([Tribu]),
    ],
    providers: [OrganizacionServices],
    controllers: [OrganizacionController],
})
export class AdminModule { }