import {
  Column,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty, IsNumber, IsOptional, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsExist } from '../utils/validators/is-exists.validator';
import { Transform } from 'class-transformer';
@Entity()
export class ActivityAvailabilityHours extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Validate(IsExist, ['ActivityAvailability', 'id'], {
    message: 'Activity availability not found',
  })
  @Column()
  activity_availability_id?: string;

  @IsOptional()
  @Allow()
  @ApiProperty({ example: '2022-12-12' })
  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  availability_date_hour?: string;

  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsNumber()
  @Column({type: 'integer', nullable: false})
  @ApiProperty({ example: '1', name: 'slots', required: true})
  slots: number;

  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date?: string;

  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date?: string;

  @IsOptional()
  @DeleteDateColumn()
  deletedAt: Date;
}
