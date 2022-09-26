import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserReview extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column({ type: 'uuid', nullable: false })
  @Validate(IsExist, ['User', 'id'], {
    message: 'User not Found',
  })
  tourist_user_id: string;

  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ad' })
  @Column({ type: 'uuid', nullable: false })
  @Validate(IsExist, ['User', 'id'], {
    message: 'User not Found',
  })
  guide_user_id: string;

  @ApiProperty({ example: 5 })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({
    type: 'int',
    nullable: false,
  })
  stars: number;

  @ApiProperty({ example: 'Very good service, 5 stars!' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({
    type: 'text',
    nullable: false,
  })
  review_text: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @IsOptional()
  @DeleteDateColumn()
  deleted_at: Date;
}
