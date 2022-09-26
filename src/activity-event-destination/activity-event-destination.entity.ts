import {
  Column,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { IsExist } from '../utils/validators/is-exists.validator';
@Entity()
export class ActivityEventDestination extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column({ nullable: true, type: 'uuid' })
  activity_event_id?: string;

  @IsOptional()
  @ApiProperty({ example: 'Place Name' })
  @Column({ nullable: true, length: 200 })
  place_name?: string;

  @IsOptional()
  @ApiProperty({ example: 'Place Description' })
  @Column({
    type: 'text',
  })
  place_description?: string;

  @IsOptional()
  @ApiProperty({ example: '9.300221' })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  latitude?: string;

  @IsOptional()
  @ApiProperty({ example: '19.670221' })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  longitude?: string;

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
