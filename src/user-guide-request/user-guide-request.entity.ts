import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
    Allow,
    IsOptional,
    Validate,
} from 'class-validator';
import { IsExist } from '../utils/validators/is-exists.validator';
import { EntityHelper } from '../utils/entity-helper';

@Entity()
export class UserGuideRequest extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
    @IsOptional()
    @Column({ nullable: true })
    user_id: string | null;

    @ApiProperty({ example: 'John' })
    @IsOptional()
    @Column({ nullable: true })
    first_name: string | null;
  
    @ApiProperty({ example: 'Doe' })
    @IsOptional()
    @Column({ nullable: true })
    last_name: string | null;

    @ApiProperty({ example: 'Doe' })
    @IsOptional()
    @Column({ nullable: true })
    email: string | null;

    @ApiProperty({ example: '3235534022' })
    @IsOptional()
    @Column({ type: 'bigint', nullable: true })
    phone_no: number | null;

    @IsOptional()
    @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
    @Column({ nullable: true })
    @Transform((value: string | null) => (value == '' ? null : value))
    @Validate(IsExist, ['Badge', 'id'], {
      message: 'Badge not Found',
    })
    badge_id?: string | null;

    @ApiProperty({ example: 'metro manila' })
    @IsOptional()
    @Index()
    @Column({ nullable: true })
    province: string | null;

    @ApiProperty({ example: 'quezon city' })
    @IsOptional()
    @Index()
    @Column({ nullable: true })
    city: string | null;

    @Allow()
    @IsOptional()
    @ApiProperty({ example: false })
    @Column({ type: 'bool', nullable: false, default: 'FALSE' })
    is_approved?: boolean;

    @CreateDateColumn()
    created_date: Date;
  
    @UpdateDateColumn()
    updated_date: Date;
  
    @IsOptional()
    @DeleteDateColumn()
    deleted_at: Date;
}
