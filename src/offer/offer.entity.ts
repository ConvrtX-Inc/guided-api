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
export class Offer extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column()
  @Generated('uuid')
  activity_package_id?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'description' })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @IsOptional()
  @ApiProperty({ example: 0 })
  @Column()
  number_person?: number;

  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  offer_date?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: '12.0' })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  offer_price?: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column()
  @Generated('uuid')
  currency_id?: string;

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
