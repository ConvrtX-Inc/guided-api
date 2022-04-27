import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { EntityHelper } from '../utils/entity-helper';
import { Transform } from 'class-transformer';
import { IsExist } from 'src/utils/validators/is-exists.validator';

@Entity()
export class UserProfileImage extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsOptional()
    @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
    @Transform((value: string | null) => (value == '' ? null : value))
    @Validate(IsExist, ['User', 'id'], {
      message: 'User not Found',
    })
    @Column({ type: 'uuid', nullable: true })
    user_id?: string | null;

    @IsOptional()
    @ApiProperty({ example: 'firebase_url_1' })
    @Column({ nullable: true, type: 'text' })
    image_firebase_url_1?: string;

    @IsOptional()
    @ApiProperty({ example: 'firebase_url_2' })
    @Column({ nullable: true, type: 'text' })
    image_firebase_url_2?: string;

    @IsOptional()
    @ApiProperty({ example: 'firebase_url_3' })
    @Column({ nullable: true, type: 'text' })
    image_firebase_url_3?: string;

    @IsOptional()
    @ApiProperty({ example: 'firebase_url_4' })
    @Column({ nullable: true, type: 'text' })
    image_firebase_url_4?: string;

    @IsOptional()
    @ApiProperty({ example: 'firebase_url_5' })
    @Column({ nullable: true, type: 'text' })
    image_firebase_url_5?: string;

    @IsOptional()
    @ApiProperty({ example: 'firebase_url_6' })
    @Column({ nullable: true, type: 'text' })
    image_firebase_url_6?: string;

    @IsOptional()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_date?: string;
  
    @IsOptional()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_date?: string;
}
