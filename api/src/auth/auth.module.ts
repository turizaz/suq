import { Module } from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {AtStrategy, RtStrategy} from "./strategies";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        UsersModule,
        PassportModule.register({defaultStrategy: "at-token"}),
        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers: [AuthService, AtStrategy, RtStrategy],
    exports: [AtStrategy, RtStrategy, PassportModule],
})
export class AuthModule {}
