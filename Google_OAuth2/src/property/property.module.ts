// import { Module, ValidationPipe } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
// import { APP_PIPE } from '@nestjs/core';
import { PropertyService } from './property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  controllers: [PropertyController],
  providers: [PropertyService],
  // use pipes for the whole module
  // providers: [
  //   {
  //     provide: APP_PIPE,
  //     useValue: new ValidationPipe({
  //       whitelist: true,
  //       forbidNonWhitelisted: true,
  //     }),
  //   },
  // ],
})
export class PropertyModule {}
