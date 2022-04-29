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

    @ApiProperty({ example: 'Why do you think you will be a good Guide' })
    @IsOptional()
    @Column({ nullable: true })
    good_guide_reason: string | null;

    @ApiProperty({ example: 'Briefly describe the Adventures you want to host' })
    @IsOptional()
    @Column({ nullable: true })
    adventures_to_host: string | null;

    @ApiProperty({ example: 'What locations will you be running your Adventures' })
    @IsOptional()
    @Column({ nullable: true })
    adventure_location: string | null;

    @ApiProperty({ example: 'What will make your Adventures stand-out' })
    @IsOptional()
    @Column({ nullable: true })
    standout_reason: string | null;

    @ApiProperty({ example: 'Why do you want to work with Guided?' })
    @IsOptional()
    @Column({ nullable: true })
    guided_reason: string | null;

    @ApiProperty({ example: 'How did you hear about us' })
    @IsOptional()
    @Column({ nullable: true })
    where_did_you_hear_us: string | null;

    @ApiProperty({ example: 'How did you hear about us' })
    @IsOptional()
    @Column({ nullable: true })
    where_did_you_hear_us_reason: string | null;

    @Allow()
    @IsOptional()
    @ApiProperty({ example: false })
    @Column({ type: 'bool', nullable: false, default: 'FALSE' })
    is_first_aid?: boolean;

    @ApiProperty({ example: 'certificate_name' })
    @IsOptional()
    @Column({ nullable: true })
    certificate_name: string | null;

    @ApiProperty({ example: 'image_firebase_url' })
    @IsOptional()
    @Column({ nullable: true })
    image_firebase_url: string | null;

    @CreateDateColumn()
    created_date: Date;
  
    @UpdateDateColumn()
    updated_date: Date;
  
    @IsOptional()
    @DeleteDateColumn()
    deleted_at: Date;
}
