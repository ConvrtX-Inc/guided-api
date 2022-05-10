import {
  Column, CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Transform } from 'class-transformer';
import { IsExist } from '../utils/validators/is-exists.validator';

@Entity()
export class Notification extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column({ nullable: true })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Validate(IsExist, ['User', 'id'], {
    message: 'User not Found',
  })
  user_id?: string | null;

  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
    @Validate(IsExist, ['Messages', 'id'], {
        message: 'Message Id not Found',
    })
    @Column({
        type: "uuid",
        nullable: true
    })
   message_id?: string;

  @IsOptional()
  @ApiProperty({ example: 'Notification Msg' })
  @Column({ length: 50 })
  notification_msg?: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @IsOptional()
  @DeleteDateColumn()
  deleted_at: Date;
}
