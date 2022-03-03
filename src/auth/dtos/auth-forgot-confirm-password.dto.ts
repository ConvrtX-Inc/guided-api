import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class AuthForgotConfirmDto {
  @ApiProperty({
    example: '154',
  })
  @Transform((value: string) => value.toLowerCase().trim())
  @IsOptional()
  hash: string;
}
