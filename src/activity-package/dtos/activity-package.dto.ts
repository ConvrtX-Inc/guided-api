import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ClosestActivityDto {
  @IsNotEmpty()
  @ApiProperty({ example: '9.30' })
  latitude?: string;

  @IsNotEmpty()
  @ApiProperty({ example: '19.67' })
  longitude?: string;

  @IsNotEmpty()
  @ApiProperty({ example: '20' })
  distance?: string;
}
