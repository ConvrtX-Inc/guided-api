import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { IsExist } from '../utils/validators/is-exists.validator';
import * as base64_arraybuffer from 'base64-arraybuffer-converter';
import { Transform } from 'class-transformer';

@Entity()
export class ActivityPackageDestinationImage extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Transform((value: string | null) => (value == '' ? null : value))
  //@Validate(IsExist, ['ActivityPackageDestination', 'id'], {
  //  message: 'Activity Package destination not found',
  //})
  @Column({ nullable: true, type: 'uuid' })
  activity_package_destination_id?: string | null;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'byte64image' })
  @Transform((value: Buffer | null | string) => (value == null ? '' : value))
  @Column({
    name: 'snapshot_img',
    type: 'bytea',
    nullable: true,
  })
  snapshot_img?: Buffer | null | string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: false })
  @Column({ type: 'bool', nullable: true, default: false })
  default_img?: boolean;

  @BeforeUpdate()
  @BeforeInsert()
  public encodeImage() {
    this.snapshot_img = this.snapshot_img
      ? base64_arraybuffer.base64_2_ab(this.snapshot_img)
      : '';
  }

  @AfterLoad()
  public async decodeImage() {
    try {
      if (typeof this.snapshot_img !== null && this.snapshot_img != undefined) {
        this.snapshot_img = await base64_arraybuffer.ab_2_base64(
          new Uint8Array(base64_arraybuffer.base64_2_ab(this.snapshot_img)),
        );
      }
    } catch (e) {}
  }

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
