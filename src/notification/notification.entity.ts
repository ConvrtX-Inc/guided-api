import {
  Column, CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Transform } from 'class-transformer';
import { IsExist } from '../utils/validators/is-exists.validator';
import { BookingRequest } from 'src/booking-request/booking-request.entity';
import { User } from 'src/users/user.entity';

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
  from_user_id?: string | null;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({ name: 'from_user_id', referencedColumnName: 'id'})
  from_user?: User;


  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column({ nullable: true })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Validate(IsExist, ['User', 'id'], {
    message: 'User not Found',
  })
  to_user_id?: string | null;


  @IsOptional()
  @ApiProperty({ example: 'title' })
  @Column({ length: 50 })
  title?: string;

  @IsOptional()
  @ApiProperty({ example: 'Notification Msg' })
  @Column({ length: 50 })
  notification_msg?: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Column({nullable:true})
  @Generated('uuid')
  booking_request_id?: string;

  @IsOptional()
  @ApiProperty({ example: 'booking request' })
  @Column({ length: 50 })
  type?: string;

  @IsOptional()
  @ApiProperty({ example: '37729937' })
  @Column({ length: 50, nullable: true })
  transaction_no?: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @IsOptional()
  @DeleteDateColumn()
  deleted_at: Date;
}
