import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Transform } from 'class-transformer';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

@Entity()
export class UserAvailability extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Validate(IsExist, ['User', 'id'], {
    message: 'User not Found',
  })
  @Validate(IsNotExist, ['UserAvailability'], {
    message: 'userAvailabilityAlreadyExists',
  })
  @Column({ type: 'uuid', nullable: true })
  user_id?: string | null;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: false })
  @Column({ type: 'bool', nullable: true, default: false })
  is_available?: boolean;

  @IsOptional()
  @ApiProperty({ example: 'reason' })
  @Column({ nullable: true, type: 'text' })
  reason?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({
    example: '2022-04-26 ',
  })
  @Column({
    type: 'date',
    nullable: false,
  })
  return_date?: Date;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @IsOptional()
  @DeleteDateColumn()
  deleted_date: Date;
}
