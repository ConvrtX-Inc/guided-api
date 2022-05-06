import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Transform } from 'class-transformer';
import { IsExist } from 'src/utils/validators/is-exists.validator';

@Entity()

export class Wishlist extends EntityHelper {
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
    @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
    @Transform((value: string | null) => (value == '' ? null : value))
    @Validate(IsExist, ['ActivityPackage', 'id'], {
      message: 'Activity package not Found',
    })
    @Column()
    activity_package_id?: string;

    @CreateDateColumn()
    created_date: Date;
  
    @UpdateDateColumn()
    updated_date: Date;
  
    @IsOptional()
    @DeleteDateColumn()
    deleted_date: Date;
}