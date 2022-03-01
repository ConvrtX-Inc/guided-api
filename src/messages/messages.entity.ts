import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import * as base64_arraybuffer from 'base64-arraybuffer-converter';
import { Transform } from 'class-transformer';

@Entity()
export class Messages extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column()
  @Generated('uuid')
  sender_id?: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column()
  @Generated('uuid')
  receiver_id?: string;

  @IsOptional()
  @ApiProperty({ example: 'Hey' })
  @Column({ type: 'text' })
  message?: string;

  @IsOptional()
  @ApiProperty({ example: 'Session Id' })
  @Column({ length: 200 })
  session_id?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: true })
  @Column({ type: 'bool', nullable: true })
  is_read?: boolean;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'byte64image' })
  @Transform((value: Buffer | null | string) => (value == null ? '' : value))
  @Column({
    name: 'attachment',
    type: 'bytea',
    nullable: true,
  })
  attachment?: Buffer | null | string;

  @BeforeUpdate()
  @BeforeInsert()
  public encodeImage() {
    this.attachment = this.attachment
      ? base64_arraybuffer.base64_2_ab(this.attachment)
      : '';
  }

  @AfterLoad()
  public async decodeImage() {
    try {
      if (typeof this.attachment !== null && this.attachment != undefined) {
        this.attachment = await base64_arraybuffer.ab_2_base64(
          new Uint8Array(base64_arraybuffer.base64_2_ab(this.attachment)),
        );
      }
    } catch (e) {}
  }

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column()
  @Generated('uuid')
  offer_id?: string;

  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date?: string;

  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date?: string;
}
