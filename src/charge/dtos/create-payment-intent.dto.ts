import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentIntentDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 552 })
  amount: number;
}

export default CreatePaymentIntentDto;
