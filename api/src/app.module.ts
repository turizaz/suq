import { Module } from '@nestjs/common';
import {AssetModule} from "./asset/asset.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "./auth/auth.module";
import { UsersModule } from './users/users.module';

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
  providers: [],
})
export class AppModule {}
