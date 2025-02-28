import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class HeadersDto {
  @IsString()
  @Expose({ name: 'access-token' }) // auto map key "access-token" to accessToken field
  accessToken: string;
}
