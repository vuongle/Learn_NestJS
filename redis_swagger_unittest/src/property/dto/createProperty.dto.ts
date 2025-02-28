import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty()
  @IsString()
  @Length(3, 10, { message: 'Name must be between 3 and 10 characters' })
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  price: number;
}
