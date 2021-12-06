import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import {Column} from "typeorm";

export class AuthForgotPasswordDto {
  @ApiProperty()
  @Transform((value: string) => value.toLowerCase().trim())
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '950670000' })
  @Transform((value: string) => value.toLowerCase().trim())
  @IsOptional()
  phone_no: string;
}
