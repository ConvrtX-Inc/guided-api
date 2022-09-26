import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class SendNotificationDto {
  @ApiProperty({ example: '[]' })
  @IsNotEmpty()
  registration_ids: string[];

  @ApiProperty({ example: 'title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'body' })
  @IsOptional()
  body: string;

  @ApiProperty({ example: 'notification data' })
  @IsNotEmpty()
  data: any;
}
