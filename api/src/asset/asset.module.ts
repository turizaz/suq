import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AssetRepository} from "./asset.repository";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([AssetRepository]),
        AuthModule
    ],
    controllers: [AssetController],
    providers: [AssetService],
})
export class AssetModule {}
