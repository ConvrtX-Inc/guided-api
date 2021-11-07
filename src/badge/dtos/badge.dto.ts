import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class BadgeDto {
  @Allow()
  @ApiProperty({ example: 'Hiking' })
  name?: string;
}
