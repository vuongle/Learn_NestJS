import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import dbConfig from 'src/config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // this config is global for the whole app, no need to load in any other modules
      expandVariables: true, // allow to access env variables inside other env variables
      envFilePath: `.env.${process.env.NODE_ENV}`, // load env file based on NODE_ENV
      load: [dbConfig], // load db config when the ConfigModule is initialized
    }),
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig,
    }),
    // use memory cache
    // CacheModule.register({
    //   isGlobal: true,
    //   ttl: 10 * 1000, // 10 seconds
    // }),
    PropertyModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
