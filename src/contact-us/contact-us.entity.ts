import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class ContactUs extends EntityHelper {
  @Allow()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'Jane Doe' })
  @Column({ length: 100 })
  name?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'example@gmail.com' })
  @Column({ nullable: true, length: 100 })
  email?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'Sample message.' })
  @Column({ type: 'text' })
  message?: string;

  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date?: string;

  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date?: string;
}
