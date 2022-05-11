import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import * as base64_arraybuffer from 'base64-arraybuffer-converter';
import { Transform } from 'class-transformer';
import { IsExist } from '../utils/validators/is-exists.validator';

@Entity()
export class Certificate extends EntityHelper {
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
  @ApiProperty({ example: 'Certificate Name' })
  @Column({ nullable: false, length: 200 })
  certificate_name?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'Certificate Description' })
  @Column({ type: 'text' })
  certificate_description?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'byte64image' })
  @Transform((value: Buffer | null | string) => (value == null ? '' : value))
  @Column({
    name: 'img_snapshot',
    type: 'bytea',
    nullable: true,
  })
  img_snapshot?: Buffer | null | string;

  @BeforeUpdate()
  @BeforeInsert()
  public encodeImage() {
    this.img_snapshot = this.img_snapshot
      ? base64_arraybuffer.base64_2_ab(this.img_snapshot)
      : '';
  }

  @AfterLoad()
  public async decodeImage() {
    try {
      if (typeof this.img_snapshot !== null && this.img_snapshot != undefined) {
        this.img_snapshot = await base64_arraybuffer.ab_2_base64(
          new Uint8Array(base64_arraybuffer.base64_2_ab(this.img_snapshot)),
        );
      }
    } catch (e) {}
  }

  @IsOptional()
  @ApiProperty({ example: 'certificate_photo_firebase_url' })
  @Column({
    type: 'text',
    nullable: true,
  })
  certificate_photo_firebase_url: string | null;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @IsOptional()
  @DeleteDateColumn()
  deleted_at: Date;
}
