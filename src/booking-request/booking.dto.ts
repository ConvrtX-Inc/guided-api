import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FindBookingDto {
  @IsOptional()
  @ApiProperty({ example: '08' })
  month: string;
}
