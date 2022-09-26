import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  Allow,
  IsOptional,
  Validate,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { EntityHelper } from '../utils/entity-helper';
import { IsNotExist } from '../utils/validators/is-not-exists.validator';
import { Transform } from 'class-transformer';
import { IsExist } from '../utils/validators/is-exists.validator';
import { CrudValidationGroups } from '@nestjsx/crud';

@Entity()
export class UserActivityPostSummary extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Validate(IsExist, ['User', 'id'], {
    message: 'User not Found',
  })
  @Column()
  user_id?: string;

  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsNumber()
  @Column({ type: 'integer', nullable: false })
  @ApiProperty({ example: '1', name: 'activity package views', required: true })
  activity_package_views: number;

  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsNumber()
  @Column({ type: 'integer', nullable: false })
  @ApiProperty({ example: '1', name: 'activity package count', required: true })
  activity_package_count: number;

  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsNumber()
  @Column({ type: 'integer', nullable: false })
  @ApiProperty({ example: '1', name: 'newsfeed views', required: true })
  newsfeed_views: number;

  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsNumber()
  @Column({ type: 'integer', nullable: false })
  @ApiProperty({ example: '1', name: 'newsfeed count', required: true })
  newsfeed_count: number;

  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsNumber()
  @Column({ type: 'integer', nullable: false })
  @ApiProperty({ example: '1', name: 'event views', required: true })
  event_views: number;

  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsNumber()
  @Column({ type: 'integer', nullable: false })
  @ApiProperty({ example: '1', name: 'event count', required: true })
  event_count: number;

  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsNumber()
  @Column({ type: 'integer', nullable: false })
  @ApiProperty({ example: '1', name: 'article views', required: true })
  article_views: number;

  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsNumber()
  @Column({ type: 'integer', nullable: false })
  @ApiProperty({ example: '1', name: 'article count', required: true })
  article_count: number;

  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsNumber()
  @Column({ type: 'integer', nullable: false })
  @ApiProperty({ example: '1', name: 'advertisement views', required: true })
  advertisement_views: number;

  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsNumber()
  @Column({ type: 'integer', nullable: false })
  @ApiProperty({ example: '1', name: 'advertisement count', required: true })
  advertisement_count: number;

  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsNumber()
  @Column({ type: 'integer', nullable: false })
  @ApiProperty({ example: '1', name: 'outfitter views', required: true })
  outfitter_views: number;

  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsNumber()
  @Column({ type: 'integer', nullable: false })
  @ApiProperty({ example: '1', name: 'outfitter count', required: true })
  outfitter_count: number;

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
