import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStripeAccountDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: '' })
  email: string;

  @ApiProperty({ example: '' })
  city: string;

  @ApiProperty({ example: 'US' })
  @MinLength(2)
  @MaxLength(2)
  country: string;

  @ApiProperty({ example: '' })
  line1: string;
  @ApiProperty({ example: '' })
  line2: string;
  @ApiProperty({ example: '' })
  postal_code: string;
  @ApiProperty({ example: '' })
  state: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: '' })
  last_name: string;
  @ApiProperty({ example: '' })
  maiden_name: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  phone: string;
}

export default CreateStripeAccountDto;
