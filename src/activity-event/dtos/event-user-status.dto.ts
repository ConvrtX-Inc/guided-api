import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class EventUserAndStatusDto {
  @Allow()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  user_id: string;

  @Allow()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  status_id: string;
}
