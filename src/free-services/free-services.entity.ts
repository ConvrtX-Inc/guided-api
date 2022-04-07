import {Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional } from 'class-validator';
import { EntityHelper } from '../utils/entity-helper';

@Entity()
export class FreeServices extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @ApiProperty({ example: 'Active' })
  @Column()
  name?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: true })
  @Column({ type: 'bool', nullable: true, default: true })
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
