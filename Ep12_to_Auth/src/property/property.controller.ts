import {
  Body,
  Controller,
  Delete,
  Get,
  // Headers,
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
import { ConfigService } from '@nestjs/config';
import { RequestHeader } from 'src/property/decorator/requestHeader';
import { CreatePropertyDto } from 'src/property/dto/createProperty.dto';
import {
  createPropertySchema,
  CreatePropertyZodDto,
} from 'src/property/dto/createPropertyZod.dto';
import { HeadersDto } from 'src/property/dto/headers.dto';
import { IdParamDto } from 'src/property/dto/idParam.dto';
import { PaginationDto } from 'src/property/dto/pagination.dto';
import { UpdatePropertyDto } from 'src/property/dto/updateProperty.dto';
import { ZodValidationPipe } from 'src/property/pipes/zodValidationPipe';
import { PropertyService } from 'src/property/property.service';

@Controller('properties')
export class PropertyController {
  constructor(
    private propertyService: PropertyService,
    private configService: ConfigService,
  ) {}

  // An example of using query params for pagination
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    console.log(this.configService.get<string>('DB_URL'));
    return this.propertyService.findAll(paginationDto);
  }

  // An example of a dynamic route with a param and a query string (video #1)
  // Use pipes to transform the param and query to specific types (video #2)
  // http://localhost:3000/properties/12?sort=false
  @Get(':id')
  findByID(
    @Param('id', ParseIntPipe) id: number,
    @Query('sort', ParseBoolPipe) sort: boolean,
  ) {
    console.log(typeof id);
    console.log(typeof sort);
    return this.propertyService.findOne(id);
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
    return this.propertyService.create(body);
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
  // An example of accessing headers by using the @Headers() decorator
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
  update(
    @Param() { id }: IdParamDto,
    @Body() body: UpdatePropertyDto,
    //@Headers() headers: HeadersDto, // use standard header decorator to access headers only
    @RequestHeader(
      new ValidationPipe({
        whitelist: true,
        validateCustomDecorators: true,
      }),
    )
    headers: HeadersDto, // use a custom decorator to access headers and validate
  ) {
    console.log(headers);
    console.log(id);
    return this.propertyService.update(id, body);
  }

  @Delete(':id')
  delete(@Param() { id }: IdParamDto) {
    this.propertyService.delete(id);
  }
}
