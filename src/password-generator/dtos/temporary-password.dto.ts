import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TemporaryPasswordDto {
  @ApiProperty()
  @IsString()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}
