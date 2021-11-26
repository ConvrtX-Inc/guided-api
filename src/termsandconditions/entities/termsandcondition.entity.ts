import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Termsandcondition extends EntityHelper {
  @Allow()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @ApiProperty({ example: 'Title' })
  @Column({ nullable: false, length: 100 })
  type_name: string;

  @Allow()
  @ApiProperty({ example: 'Description' })
  @Column({ nullable: false, type: 'text' })
  text_content: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @IsOptional()
  @DeleteDateColumn()
  deletedAt: Date;
}
