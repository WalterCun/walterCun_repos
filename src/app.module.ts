import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config'
import configuration from './config/default';
import { DBModule } from "./db.module";
import { AdminOrgModule } from "./modules/admin-org/admin-org.module";

import { FakeApiModule } from "./modules/fakeapi/fakeapi.module";

@Module({
    imports: [
        FakeApiModule,
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
        }),
        DBModule,
        AdminOrgModule,
    ],
    controllers: [],
    providers: []
})
export class AppModule { }