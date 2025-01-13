import { IsInt, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @Length(3, 10, { message: 'Name must be between 3 and 10 characters' })
  name: string;

  @IsString()
  description: string;

  @IsInt()
  area: number;
}
