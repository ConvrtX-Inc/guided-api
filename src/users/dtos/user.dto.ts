import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class UserDto {
  @Allow()
  @ApiProperty({ example: 'google_wallet' })
  default_payment_method?: string;
}
