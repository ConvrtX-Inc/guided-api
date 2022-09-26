import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Status } from 'src/statuses/status.entity';
import { Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';
import { ActivityPackage } from 'src/activity-package/activity-package.entity';

@Entity()
export class BookingRequest extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Column()
  @Generated('uuid')
  user_id?: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Column()
  @Generated('uuid')
  from_user_id?: string;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({ name: 'from_user_id', referencedColumnName: 'id' })
  from_user?: User;

  @IsOptional()
  @ApiProperty({ example: 'Request Msg' })
  @Column({ nullable: false, length: 100 })
  request_msg?: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Column()
  @Generated('uuid')
  activity_package_id?: string;

  @ManyToOne(() => ActivityPackage, {
    eager: true,
  })
  @JoinColumn({ name: 'activity_package_id', referencedColumnName: 'id' })
  package?: ActivityPackage;

  @IsOptional()
  @ApiProperty({ example: 'profile_photo_firebase_url' })
  @Column({ nullable: true, type: 'text' })
  profile_photo_firebase_url?: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Column()
  @Generated('uuid')
  status_id?: string;

  @ManyToOne(() => Status, {
    eager: true,
  })
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  status?: Status;

  @IsOptional()
  @ApiProperty({ example: '2022-01-01 11:11:11' })
  @Column({ type: 'timestamp' })
  booking_date_start?: Date;

  @IsOptional()
  @ApiProperty({ example: '2022-12-12 11:11:11' })
  @Column({ type: 'timestamp' })
  booking_date_end?: Date;

  @IsOptional()
  @ApiProperty({ example: 5 })
  @Column({ nullable: false })
  number_of_person?: number;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: false })
  @Column({ type: 'bool', nullable: true, default: false })
  is_approved?: boolean;

  @IsOptional()
  @ApiProperty({ example: 'completed/pending/rejected' })
  @Column({
    type: 'text',
    nullable: true,
  })
  payment_status?: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @IsOptional()
  @DeleteDateColumn()
  deleted_date: Date;
}
