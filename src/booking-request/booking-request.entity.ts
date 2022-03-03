import {Column, DeleteDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Status } from 'src/statuses/status.entity';

@Entity()
export class BookingRequest extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column()
  @Generated('uuid')
  user_id?: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column()
  @Generated('uuid')
  from_user_id?: string;

  @IsOptional()
  @ApiProperty({ example: 'Request Msg' })
  @Column({ nullable: false, length: 100 })
  request_msg?: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column()
  @Generated('uuid')
  activity_package_id?: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column()
  @Generated('uuid')
  status_id?: string;

  @ManyToOne(() => Status, {
    eager: true,
  })
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  status?: Status;

  @IsOptional()
  @ApiProperty({ example: '11/10/21' })
  @Column({ type: 'timestamp' })
  booking_date_start?: string;

  @IsOptional()
  @ApiProperty({ example: '11/20/21' })
  @Column({ type: 'timestamp' })
  booking_date_end?: string;

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
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date?: string;

  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date?: string;


  @IsOptional()
  @DeleteDateColumn()
  deletedAt: Date;
}
