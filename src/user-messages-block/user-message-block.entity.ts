import {
    Column,    
    CreateDateColumn,    
    Entity,    
    PrimaryGeneratedColumn,
    UpdateDateColumn,    
  } from 'typeorm';
  import { Transform } from 'class-transformer';
  import { ApiProperty } from '@nestjs/swagger';  
  import {    
    IsOptional,    
    Validate,
    Allow
  } from 'class-validator';  
  import { EntityHelper } from 'src/utils/entity-helper';  
  import { IsExist } from '../utils/validators/is-exists.validator';
  
  @Entity()
  export class UserBlockMessages extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @IsOptional()
    @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
    @Transform((value: string | null) => (value == '' ? null : value))
    @Validate(IsExist, ['User', 'id'], {
      message: 'User not Found',
    })
    @Column({ nullable: true })
    to_user_id?: string | null;

    @IsOptional()
    @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
    @Transform((value: string | null) => (value == '' ? null : value))
    @Validate(IsExist, ['User', 'id'], {
      message: 'User not Found',
    })
    @Column({ nullable: true })
    from_user_id?: string | null;    

    @Allow()
    @IsOptional()
    @ApiProperty({ example: true })
    @Column({ type: 'boolean', nullable: true, default: () => 'TRUE' })
    is_active: boolean | null;
  
    @CreateDateColumn()
    created_date: Date;
  
    @UpdateDateColumn()
    updated_date: Date;    
  }
  