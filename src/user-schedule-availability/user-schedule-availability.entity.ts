import {
  Column,    
  Entity,    
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { IsExist } from '../utils/validators/is-exists.validator';  
import { Transform } from 'class-transformer';
  
@Entity()
export class UserScheduleAvailability extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Validate(IsExist, ['User', 'id'], {
    message: 'User not Found',
  })
  @Column({ nullable: true })
  user_id?: string | null;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: true })
  @Column({ type: 'bool', nullable: true })
  available?: boolean;
  
  @IsOptional()
  @ApiProperty({ example: 'reason' })
  @Column({type: 'text' })
  reason?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: '2021-10-10' })
  @Column({ type: 'date', nullable: true })
  return_date?: Date;

  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date?: string;
  
  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date?: string;      
}
  