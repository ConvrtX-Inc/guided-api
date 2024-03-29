import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional } from 'class-validator';
import { EntityHelper } from '../utils/entity-helper';
import { StatusName } from 'aws-sdk/clients/ec2';

@Entity()
export class Status extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @ApiProperty({ example: 'Active' })
  @Column()
  status_name?: string | StatusName;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: true })
  @Column({ type: 'bool', nullable: true })
  is_active?: boolean;

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
