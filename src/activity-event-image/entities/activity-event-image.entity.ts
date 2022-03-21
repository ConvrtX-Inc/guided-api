import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { Transform } from 'class-transformer';
import * as base64_arraybuffer from 'base64-arraybuffer-converter';
import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeUpdate,
    BeforeInsert,
    AfterLoad,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, 
    Generated, 
} from 'typeorm';

@Entity()
export class ActivityEventImage extends EntityHelper {
@PrimaryGeneratedColumn('uuid')
id: string;

@IsOptional()
  @ApiProperty({ example: 'b97190f4-f2db-4d1e-af48-4f48d881579d' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Validate(IsExist, ['ActivityEvent', 'id'], {
    message: 'Activity Event not found',
  })
  @Column({ nullable: true })
  activity_event_id: string | null;

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

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @DeleteDateColumn()
  deletedAt: Date;
  
}
