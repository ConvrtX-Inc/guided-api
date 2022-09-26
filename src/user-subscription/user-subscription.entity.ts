import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { IsExist } from 'src/utils/validators/is-exists.validator';

@Entity()
export class UserSubscription extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Validate(IsExist, ['User', 'id'], {
    message: 'User not Found',
  })
  @Column({ nullable: true })
  user_id?: string | null;

  @IsOptional()
  @ApiProperty({ example: 'map' })
  @Column({ length: 20 })
  name: string;

  @IsOptional()
  @ApiProperty({ example: '10' })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  price?: string;

  @IsOptional()
  @ApiProperty({ example: 'name' })
  @Column({ type: 'text' })
  payment_reference_no?: string;

  @IsOptional()
  @ApiProperty({ example: '' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  start_date?: string;

  @IsOptional()
  @ApiProperty({ example: '' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  end_date?: string;

  @IsOptional()
  @ApiProperty({ example: 'name' })
  @Column({ type: 'text' })
  message?: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'Status not Found',
  })
  @Column({ nullable: true })
  status_id?: string | null;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @DeleteDateColumn()
  deleted_date: Date;
}
