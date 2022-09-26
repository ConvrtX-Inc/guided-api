import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Validate,
  Allow,
} from 'class-validator';
import { EntityHelper } from '../../utils/entity-helper';
import { IsExist } from '../../utils/validators/is-exists.validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ActivityOutfitter extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'eae25276-3af3-432c-9c1b-7b7548513015' })
  @Validate(IsExist, ['User', 'id'], {
    message: 'User not Found',
  })
  @Column()
  user_id: string;

  @ApiProperty({ example: 'Sports Gloves' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ nullable: false, length: 100 })
  title: string;

  @ApiProperty({ example: '1000.00' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsNumber()
  //@Column({ nullable: false, type: 'money' })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  price: number;

  @ApiProperty({ example: 'https://productlink.com' })
  @IsOptional({
    groups: [CrudValidationGroups.UPDATE, CrudValidationGroups.CREATE],
  })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ nullable: false, length: 200 })
  product_link: string;

  @ApiProperty({ example: 'USA' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ nullable: true })
  country: string;

  @ApiProperty({ example: 'address' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ nullable: true })
  address: string;

  @ApiProperty({ example: 'street' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ nullable: true })
  street: string;

  @ApiProperty({ example: 'city' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ nullable: true })
  city: string;

  @ApiProperty({ example: 'province' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ nullable: true })
  province: string;

  @ApiProperty({ example: 'zip_code' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ nullable: true })
  zip_code: string;

  @ApiProperty({ example: '2021-12-30' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ nullable: false, type: 'timestamp' })
  availability_date: Date;

  @ApiProperty({ example: 'The no. 1 sports gloves in the market' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ nullable: false, type: 'text' })
  description: string;

  @IsOptional()
  @ApiProperty({ example: false })
  @Column({ type: 'bool', nullable: true, default: false })
  is_published?: boolean;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: false })
  @Column({ type: 'bool', nullable: true, default: false })
  is_post?: boolean;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: false })
  @Column({ type: 'bool', nullable: true, default: false })
  premium_user?: boolean;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
