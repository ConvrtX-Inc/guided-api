import { ApiProperty } from '@nestjs/swagger';
import {
  Allow,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
} from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Transform } from 'class-transformer';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform((value: string) => value.toLowerCase().trim())
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  last_name: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: '3235534022' })
  phone_no: number;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: '1' })
  country_code: number;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  user_type_id?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: true })
  is_for_the_planet?: boolean;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: true })
  is_first_aid_trained?: boolean;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'Guide' })
  user_type?: string;
}
