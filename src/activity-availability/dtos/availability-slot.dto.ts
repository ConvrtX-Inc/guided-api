import { ApiProperty } from '@nestjs/swagger';
import {
  Allow,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class SlotAvailabilityDto {
  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Validate(IsExist, ['ActivityPackage', 'id'], {
    message: 'Activity package not Found',
  })
  activity_package_id?: string;

  @Allow()
  @IsNotEmpty()
  @ApiProperty({
    example: '2022-02-22 11:11:11',
  })
  availability_date?: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: '1', name: 'slots', required: true })
  slots: number;
}
