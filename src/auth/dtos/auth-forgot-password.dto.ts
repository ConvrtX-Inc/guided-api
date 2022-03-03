import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class AuthForgotPasswordDto {

  @ApiProperty({
    example: 'test@example.com',
    description:
      'this is optional. If phone is already added email is not needed, just leave it empty',
  })
  @Transform((value: string) => value.toLowerCase().trim())
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '950670000',
    description:
      'this is optional, Please follow the inputted sample.If email is already added phone_no is not needed, just leave it empty',
  })
  @Transform((value: string) => value.toLowerCase().trim())
  @IsOptional()
  phone_no: string;
}
