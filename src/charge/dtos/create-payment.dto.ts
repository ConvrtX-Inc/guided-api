import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @IsNotEmpty()
  @ApiProperty({ example: '2022-03-22' })
  start_date: string;

  @IsNotEmpty()
  @ApiProperty({ example: '2022-03-22' })
  end_date: string;
}

export default CreatePaymentDto;
