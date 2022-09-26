import {
  Column,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
@Entity()
export class ActivityEventForms extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column()
  @Generated('uuid')
  activity_event_id?: string; //id is dynamic based on the category type table

  @IsOptional()
  @Allow()
  @ApiProperty({ example: 'Rules' })
  @Column({ type: 'text', nullable: false })
  guide_rules?: string;

  @IsOptional()
  @Allow()
  @ApiProperty({ example: 'Local Law Taxes' })
  @Column({ type: 'text', nullable: false })
  local_law_taxes?: string;

  @IsOptional()
  @Allow()
  @ApiProperty({ example: 'Waiver' })
  @Column({ type: 'text', nullable: false })
  release_waiver?: string;

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
