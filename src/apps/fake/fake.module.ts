import { Module } from "@nestjs/common";
import { FakeController } from "./apifake.controller";

@Module({
    imports: [],
    providers: [],
    controllers: [FakeController],
})
export class FakeApiModule { }