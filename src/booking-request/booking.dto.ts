import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FindBookingDto {
  @IsNotEmpty()
  @ApiProperty({ example: '2022-02-28' })
  first_date: string;

  @IsNotEmpty()
  @ApiProperty({ example: '2022-02-28' })
  second_date: string;
}
