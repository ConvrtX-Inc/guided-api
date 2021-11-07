import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthSwitchUserTypeDto {
  @ApiProperty({ example: 'Guide' })
  @IsNotEmpty()
  user_type: string;
}
