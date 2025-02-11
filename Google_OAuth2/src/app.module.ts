import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import dbConfig from 'src/config/db.config';
import dbConfigProduction from 'src/config/db.config.production';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // this config is global for the whole app, no need to load in any other modules
      expandVariables: true, // allow to access env variables inside other env variables
      load: [dbConfig, dbConfigProduction], // load db config when the ConfigModule is initialized
    }),
    PropertyModule,
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV === 'production' ? dbConfigProduction : dbConfig,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
