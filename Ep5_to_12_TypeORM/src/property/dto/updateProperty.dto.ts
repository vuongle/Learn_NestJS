import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from 'src/property/dto/createProperty.dto';

// create a new class with all fields from CreatePropertyDto, these fields are all optional
export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {}
