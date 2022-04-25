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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  company_name: string;

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

  @ApiProperty({ example: '+12018790896' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Provide tour services' })
  @IsNotEmpty()
  product_description: string;
}

export default CreateStripeAccountDto;
