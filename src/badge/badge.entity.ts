import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import * as base64_arraybuffer from 'base64-arraybuffer-converter';
import { Transform } from 'class-transformer';
import { ActivityPost } from 'src/activity-post/activity-post.entity';

@Entity()
export class Badge extends EntityHelper {
  @Allow()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'Hiking' })
  @Column({ length: 50 })
  badge_name?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'description' })
  @Column({ nullable: true, length: 200 })
  badge_description?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'byte64image' })
  @Transform((value: Buffer | null | string) => (value == null ? '' : value))
  @Column({
    name: 'img_icon',
    type: 'bytea',
    nullable: true,
  })
  img_icon?: Buffer | null | string;
  @BeforeUpdate()
  @BeforeInsert()
  public encodeImage() {
    this.img_icon = this.img_icon
      ? base64_arraybuffer.base64_2_ab(this.img_icon)
      : '';
  }

  @AfterLoad()
  public async decodeImage() {
    try {
      if (typeof this.img_icon !== null && this.img_icon != undefined) {
        this.img_icon = await base64_arraybuffer.ab_2_base64(
          new Uint8Array(base64_arraybuffer.base64_2_ab(this.img_icon)),
        );
      }
    } catch (e) {}
  }

  @IsOptional()
  @ApiProperty({ example: 'firebase_snapshot_img' })
  @Column({ nullable: true, type: 'text' })
  firebase_snapshot_img?: string;

  @IsOptional()
  @ApiProperty({ example: 'Firebase img filename' })
  @Column({
    type: 'text',
    nullable: true,
  })
  filename: string | null;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: true })
  @Column('bool')
  is_main_activity?: boolean;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: true })
  @Column('bool')
  is_sub_activity?: boolean;

  @IsOptional()
  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => ActivityPost, (post) => post.activityBadge)
  activityPost: ActivityPost[];
}
