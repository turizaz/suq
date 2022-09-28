import { Module } from '@nestjs/common';
import {AssetModule} from "./asset/asset.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "./auth/auth.module";
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import {AtGuard} from "./common/guard";

@Module({
  imports: [
    AssetModule,
    AuthModule,
    TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'postgres',
          port: 5432,
          username: 'postgres',
          password: 'password',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true
        }
     ),
    UsersModule
  ],
  controllers: [],
  providers: [
      {
          provide: APP_GUARD,
          useClass: AtGuard,
      },
  ],
})
export class AppModule {}
