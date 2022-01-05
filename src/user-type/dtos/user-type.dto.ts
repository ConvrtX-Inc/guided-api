import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class UserTypeDto {
  @Allow()
  @ApiProperty({ example: 'Hiking' })
  name?: string;
}
