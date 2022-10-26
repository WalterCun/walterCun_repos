import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config'
import configuration from './config/default';
import { DBModule } from "./db.module";

import { FakeApiModule } from "./modules/fakeapi/fakeapi.module";

@Module({
    imports: [
        FakeApiModule,
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
        }),
        DBModule
    ],
    controllers: [],
    providers: []
})
export class AppModule { }