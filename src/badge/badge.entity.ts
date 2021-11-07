import {Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';

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
  @Column({
    name: 'img_icon',
    type: 'bytea',
    nullable: false,
  })
  img_icon?: Buffer;

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
}
