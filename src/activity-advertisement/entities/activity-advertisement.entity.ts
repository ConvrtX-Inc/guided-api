import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsNotEmpty, IsNumber, IsOptional, Validate } from 'class-validator';
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
import {stringifiedJson} from "aws-sdk/clients/customerprofiles";

@Entity()
export class ActivityAdvertisement extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'eae25276-3af3-432c-9c1b-7b7548513015' })
  @Validate(IsExist, ['User', 'id'], {
    message: 'User not Found',
  })
  @Column()
  user_id: string;

  @ApiProperty({ example: 'Amazing Deal Here!' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ nullable: false, length: 100 })
  title: string;

  @ApiProperty({ example: 'USA' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ nullable: false, type: 'char', length: 10 })
  country: string;

  @ApiProperty({ example: 'address' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ nullable: true })
  address: string;

  @IsOptional()
  @ApiProperty({ example: '{activities: walking}' })
  @Column('simple-json')
  activities?: stringifiedJson;

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

  @ApiProperty({ example: '2021-12-31' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ nullable: false })
  ad_date: Date;

  @ApiProperty({ example: 'One in a lifetime discount on quality products!!!' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ nullable: false })
  description: string;

  @ApiProperty({ example: '5000.00' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsNumber()
  @Column({ nullable: false, type: 'money' })
  price: number;

  @IsOptional()
  @ApiProperty({ example: false })
  @Column({ type: 'bool', nullable: true, default: false })
  is_published?: boolean;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
