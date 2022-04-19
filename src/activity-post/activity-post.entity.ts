import { Column, DeleteDateColumn, Entity, Generated, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { IsExist } from '../utils/validators/is-exists.validator';
import { Transform } from 'class-transformer';
@Entity()
export class ActivityPost extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Validate(IsExist, ['User', 'id'], {
    message: 'User not Found',
  })
  @Column({nullable: true, type: 'uuid'})
  user_id?: string | null;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column()
  @Generated('uuid')
  post_id?: string; //id is dynamic based on the category type table

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 1 })
  @Column({
    type: 'smallint',
    nullable: false,
  })
  category_type?: number;

  @IsOptional()
  @ApiProperty({ example: 'Title' })
  @Column({ nullable: true, length: 100 })
  title?: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Column({ type: 'uuid', nullable: true })
  @Generated('uuid')
  main_badge_id?: string | null;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'byte64image' })
  @Transform((value: Buffer | null | string) => (value == null ? '' : value))
  @Column({
    name: 'snapshot_img',
    type: 'bytea',
    nullable: true,
  })
  snapshot_img?: Buffer | null | string;

  @IsOptional()
  @ApiProperty({ example: '2022-03-01' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  post_date?: string;

  @IsOptional()
  @ApiProperty({ example: 'Description' })
  @Column({
    nullable: true,type: 'text'
  })
  description?: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Validate(IsExist, ['User', 'id'], {
    message: 'User not Found',
  })
  @Column({nullable: true, type: 'uuid'})
  contact_user_id?: string | null;

  @IsOptional()
  @ApiProperty({ example: 'John Doe' })
  @Column({ nullable: true, length: 100 })
  contact_person?: string;

  @IsOptional()
  @ApiProperty({ example: '12345678' })
  @Column({ nullable: true, length: 100 })
  contact_number?: string;

  @IsOptional()
  @ApiProperty({ example: 'test@gmail.com' })
  @Column({ nullable: true, length: 100 })
  contact_email?: string;

  @IsOptional()
  @ApiProperty({ example: 'www.site.com' })
  @Column({ nullable: true, length: 100 })
  contact_website?: string;


  @Allow()
  @IsOptional()
  @ApiProperty({ example: 1})
  @Column({ 
    type: 'int',
    nullable: false,
  })
  views?: number;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: false })
  @Column({ type: 'bool', nullable: true, default: false })
  is_published?: boolean;
  
  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date?: string;

  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date?: string;

}
