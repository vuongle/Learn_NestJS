import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from 'src/property/dto/createProperty.dto';
import {
  createPropertySchema,
  CreatePropertyZodDto,
} from 'src/property/dto/createPropertyZod.dto';
import { IdParamDto } from 'src/property/dto/idParam.dto';
import { ZodValidationPipe } from 'src/property/pipes/zodValidationPipe';

@Controller('properties')
export class PropertyController {
  @Get()
  findAll() {
    return 'All properties';
  }

  // An example of a dynamic route with a param and a query string (video #1)
  // Use pipes to transform the param and query to specific types (video #2)
  // http://localhost:3000/properties/12?sort=false
  @Get(':id')
  findByID(
    @Param('id', ParseIntPipe) id: string,
    @Query('sort', ParseBoolPipe) sort: boolean,
  ) {
    console.log(typeof id);
    console.log(typeof sort);
    return `Property ${id}`;
  }

  // An example of a dynamic route with 2 parameters
  @Get(':id/:slug')
  findByIDAndSlug(@Param('id') id: number, @Param('slug') slug: string) {
    return `Property ${id} - ${slug}`;
  }

  // An example of a standard post request
  // Validate the request body by using "class-validator" and "class-transformer"
  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true, // if use, auto remove fields that are not in the dto
      forbidNonWhitelisted: true, // if use, send error to client if fields are not in the dto
    }),
  )
  create(@Body() body: CreatePropertyDto) {
    console.log(body);
    return body;
  }

  // An example of using zod for validation
  @Post('zod')
  @UsePipes(new ZodValidationPipe(createPropertySchema))
  createWithZod(@Body() body: CreatePropertyZodDto) {
    console.log(body);
    return body;
  }

  // An example of a standard post request with a custom http code
  @Post()
  @HttpCode(202)
  createWithStatus(@Body() body: any) {
    console.log(body);
    return body;
  }

  // An example of auto transforming the request param and body
  @Patch(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  update(@Param() { id }: IdParamDto, @Body() body: CreatePropertyDto) {
    console.log(id);
    return body;
  }
}
