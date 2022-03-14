import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  import { Allow, IsOptional } from 'class-validator';
  import { EntityHelper } from 'src/utils/entity-helper';    
  
  @Entity()
  export class Faq extends EntityHelper {
    @Allow()    
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Allow()
    @IsOptional()
    @ApiProperty({ example: 'What is an Adventures on GuidED?' })
    @Column({ type: 'text' })
    question?: string;
    
    @Allow()
    @IsOptional()
    @ApiProperty({ example: 'Adventures are outdoor activities or trips created and led by Guides (Hosts)' })
    @Column({ type: 'text' })
    answer?: string;

    @Allow()
    @IsOptional()
    @ApiProperty({ example: 1 })    
    @Column({
      type: 'smallint',
      nullable: false,
    })
    faq_order?: number;
  
    @IsOptional()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_date?: string;
  
    @IsOptional()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_date?: string;
  }
  