import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { IsExist } from '../utils/validators/is-exists.validator';
import { double } from 'aws-sdk/clients/lightsail';

@Entity()
export class Transaction extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Validate(IsExist, ['User', 'id'], {
    message: 'User not Found',
  })
  @Column()
  user_id?: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Validate(IsExist, ['ActivityPackage', 'id'], {
    message: 'Activity Package not found',
  })
  @Column()
  activity_package_id?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: '12.0' })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  total?: number;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column()
  @Generated('uuid')
  tour_guide_id?: string;

  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  book_date?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: '100' })
  @Column({ nullable: true })
  number_of_people?: number;

  @IsOptional()
  @ApiProperty({ example: 'Service Name' })
  @Column({ length: 100 })
  service_name?: string;

  @IsOptional()
  @ApiProperty({ example: 'Service Name' })
  @Column({ length: 100 })
  transaction_number?: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column()
  @Generated('uuid')
  status_id?: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @IsOptional()
  @DeleteDateColumn()
  deleted_at: Date;
}
