import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, Validate } from 'class-validator';
import { EntityHelper } from '../utils/entity-helper';
import { IsNotExist } from '../utils/validators/is-not-exists.validator';

@Entity()
export class ActivityPostCategory extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'Activity Package' })
  @Validate(IsNotExist, ['ActivityPostCategory'], {
    message: 'nameAlreadyExists',
  })
  @Column({ length: 100 })
  name?: string;

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
