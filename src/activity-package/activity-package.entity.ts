import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { IsExist } from '../utils/validators/is-exists.validator';
import { Transform } from 'class-transformer';
import * as base64_arraybuffer from 'base64-arraybuffer-converter';
import { stringifiedJson } from 'aws-sdk/clients/customerprofiles';

@Entity()
export class ActivityPackage extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Validate(IsExist, ['User', 'id'], {
    message: 'User not Found',
  })
  @Column({ type: 'uuid', nullable: true })
  user_id?: string | null;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Column({ type: 'uuid', nullable: true })
  @Generated('uuid')
  main_badge_id?: string | null;

  @IsOptional()
  @ApiProperty({
    example: '{sub_badge_ids: cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae}',
  })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Column({
    type: 'simple-json',
    nullable: true,
  })
  sub_badge_ids?: { sub_badge_ids: string };

  @IsOptional()
  @ApiProperty({ example: '2022-03-01' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date?: string;

  @IsOptional()
  @ApiProperty({ example: 'Description' })
  @Column({ nullable: true, length: 200 })
  package_note?: string;

  @IsOptional()
  @ApiProperty({ example: 'Description' })
  @Column({ length: 100 })
  name?: string;

  @IsOptional()
  @ApiProperty({ example: 'Description' })
  @Column({
    type: 'text',
  })
  description?: string;

  @IsOptional()
  @ApiProperty({ example: 'Included free services' })
  @Column({
    type: 'text',
    nullable: true,
  })
  included?: string;

  @IsOptional()
  @ApiProperty({ example: 'Free services that are not included' })
  @Column({
    type: 'text',
    nullable: true,
  })
  not_included?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: false })
  @Column({ type: 'bool', nullable: true, default: false })
  premium_user?: boolean;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'byte64image' })
  @Transform((value: Buffer | null | string) => (value == null ? '' : value))
  @Column({
    name: 'cover_img',
    type: 'bytea',
    nullable: true,
  })
  cover_img?: Buffer | null | string;
  @BeforeUpdate()
  @BeforeInsert()
  public encodeImage() {
    this.cover_img = this.cover_img
      ? base64_arraybuffer.base64_2_ab(this.cover_img)
      : '';
  }

  @AfterLoad()
  public async decodeImage() {
    try {
      if (typeof this.cover_img !== null && this.cover_img != undefined) {
        this.cover_img = await base64_arraybuffer.ab_2_base64(
          new Uint8Array(base64_arraybuffer.base64_2_ab(this.cover_img)),
        );
      }
    } catch (e) {}
  }

  destination: any;
  distance: string;
  time_to_travel: null | string;

  @IsOptional()
  @ApiProperty({ example: '2022-03-01' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  activity_date?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 1000 })
  @Column({
    type: 'integer',
    nullable: false,
  })
  max_traveller?: number;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 0 })
  @Column({
    type: 'integer',
    nullable: false,
  })
  min_traveller?: number;

  @IsOptional()
  @ApiProperty({ example: 'country' })
  @Column({ nullable: true })
  country?: string;

  @IsOptional()
  @ApiProperty({ example: '{address: "USA"}' })
  @Column('simple-json')
  address?: { address: string };

  @IsOptional()
  @ApiProperty({ example: '{services: cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae}' })
  @Column({ type: 'simple-json', nullable: true })
  services?: stringifiedJson;

  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date?: string;

  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date?: string;

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
  @Column({ type: 'integer', nullable: true })
  max_extra_person?: number;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column({ type: 'uuid', nullable: false })
  currency_id?: string;

  @IsOptional()
  @ApiProperty({ example: 'Price Note' })
  @Column({ type: 'text', nullable: true })
  price_note?: number;

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
  @ApiProperty({ example: 'firebase_cover_img' })
  @Column({ nullable: true, type: 'text' })
  firebase_cover_img?: string;

  @IsOptional()
  @DeleteDateColumn()
  deletedAt: Date;
}
