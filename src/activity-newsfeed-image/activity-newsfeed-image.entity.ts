import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Allow, IsOptional, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import * as base64_arraybuffer from 'base64-arraybuffer-converter';
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

@Entity()
export class ActivityNewsFeedImage extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'eae25276-3af3-432c-9c1b-7b7548513015' })
  @Transform((value: string | null) => (value == '' ? null : value))
  //@Validate(IsExist, ['ActivityNewsFeed', 'id'], {
  //  message: 'Activity newsfeed not found',
  //})
  @Column({ nullable: true })
  activity_newsfeed_id: string | null;

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

  @Allow()
  @IsOptional()
  @ApiProperty({ example: false })
  @Column({ type: 'bool', nullable: true, default: false })
  default_img?: boolean;

  @IsOptional()
  @ApiProperty({ example: 'Firebase img url' })
  @Column({
    type: 'text',
    nullable: true,
  })
  img_url: string | null;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
