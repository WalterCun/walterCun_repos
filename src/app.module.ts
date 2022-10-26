import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config'
import configuration from './config/default';
import { DBModule } from "./db.module";
import { AdminOrgModule } from "./modules/admin-org/admin-org.module";

import { FakeApiModule } from "./modules/fakeapi/fakeapi.module";
import { MetricsModule } from "./modules/service-metricas/metrics.module";
import { RepositoriosModule } from "./modules/service-metricas/submodules/repositorios/repositorios.module";
import { TribusModule } from "./modules/service-metricas/submodules/tribus/tribes.module";

@Module({
    imports: [
        // Fake API
        FakeApiModule, 
        // Configuraciones globales
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
        }),
        //Configuraciones de conexion a BD
        DBModule,
        // Controlador de Organizaciones
        AdminOrgModule,
        // Controlador de los modulos de Metricas
        MetricsModule,
        RepositoriosModule,
        TribusModule,
    ],
    controllers: [],
    providers: [],
    exports:[]
})
export class AppModule { }