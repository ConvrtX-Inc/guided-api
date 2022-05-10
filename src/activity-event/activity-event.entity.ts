import {
  Column,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Allow, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { IsExist } from '../utils/validators/is-exists.validator';
import { Transform } from 'class-transformer';
@Entity()
export class ActivityEvent extends EntityHelper {
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

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Validate(IsExist, ['Badge', 'id'], {
    message: 'Badge not found',
  })
  @Column()
  badge_id?: string;

  @IsOptional()
  @ApiProperty({ example: 'Title' })
  @Column({ nullable: true, length: 100 })
  title?: string;

  @IsOptional()
  @ApiProperty({
    example: '{free_service: cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae}',
  })
  @Column({ type: 'simple-json', nullable: true })
  free_service?: string;

  @IsOptional()
  @ApiProperty({
    example: '{main_activities: cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae}',
  })
  @Column({ type: 'simple-json', nullable: true })
  main_activities?: string;

  @IsOptional()
  @ApiProperty({
    example: '{sub_activities: cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae}',
  })
  @Column({ type: 'simple-json', nullable: true })
  sub_activities?: string;

  @IsOptional()
  @ApiProperty({ example: '2022-03-01' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date?: string;

  @IsOptional()
  @ApiProperty({ example: 'Country' })
  @Column({ nullable: true })
  country?: string;

  @IsOptional()
  @ApiProperty({ example: '{address: "USA"}' })
  @Column('simple-json')
  address?: { address: string };

  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  event_date?: string;

  @IsOptional()
  @ApiProperty({ example: 'Description' })
  @Column({
    type: 'text',
  })
  description?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: false })
  @Column({ type: 'bool', nullable: true, default: false })
  premium_user?: boolean;

  @IsOptional()
  @ApiProperty({ example: '12.0' })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  price?: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Validate(IsExist, ['Status', 'id'], {
    message: 'Status not Found',
  })
  @Column({ nullable: true })
  status_id?: string | null;

  @IsOptional()
  @ApiProperty({ example: '12.0' })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  base_price?: string;

  @IsOptional()
  @ApiProperty({ example: '12.0' })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  max_price?: string;

  @IsOptional()
  @ApiProperty({ example: '12.0' })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  package_total_cost?: string;

  @IsOptional()
  @ApiProperty({ example: '12.0' })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  extra_cost_per_person?: string;

  @IsOptional()
  @ApiProperty({ example: 10 })
  @Column({ type: 'integer', default: 0 , nullable: true})
  max_extra_person?: number;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 1000 })
  @Column({
    type: 'integer',
    nullable: false,
    default: 0,
  })
  max_traveller?: number;

  @IsOptional()
  @ApiProperty({ example: 'Description' })
  @Column({ nullable: true, length: 200 })
  package_note?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: false })
  @Column({ type: 'bool', nullable: true, default: false })
  is_published?: boolean;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: false })
  @Column({ type: 'bool', nullable: true, default: false })
  is_post?: boolean;

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
