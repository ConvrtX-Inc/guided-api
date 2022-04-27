import {
  Column,
  AfterLoad,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  Allow,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
} from 'class-validator';
import { Status } from '../statuses/status.entity';
import { IsNotExist } from '../utils/validators/is-not-exists.validator';
import { FileEntity } from '../files/file.entity';
import { IsExist } from '../utils/validators/is-exists.validator';
import * as bcrypt from 'bcryptjs';
import { EntityHelper } from '../utils/entity-helper';
import { AuthProvidersEnum } from '../auth/auth-providers.enum';
import { CrudValidationGroups } from '@nestjsx/crud';
import { UserType } from '../user-type/user-type.entity';
import * as base64_arraybuffer from 'base64-arraybuffer-converter';

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John Doe' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Index()
  @Column({ nullable: true })
  full_name: string | null;

  @ApiProperty({ example: 'John' })
  @IsOptional()
  @Index()
  @Column({ nullable: true })
  first_name: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  @Index()
  @Column({ nullable: true })
  last_name: string | null;

  @ApiProperty({ example: 'test1@example.com' })
  @Transform((value: string | null) => value?.toLowerCase().trim())
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
    groups: [CrudValidationGroups.CREATE],
  })
  @IsEmail()
  @Column({ unique: true, nullable: true })
  email: string | null;

  @ApiProperty()
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @MinLength(6, {
    groups: [CrudValidationGroups.CREATE],
  })
  @Column({ nullable: true })
  password: string;

  @ApiProperty()
  @IsOptional()
  @ApiProperty({ example: '' })
  @Column({ nullable: true })
  stripe_customer_id?: string | null;

  @ApiProperty()
  @IsOptional()
  @ApiProperty({ example: '' })
  @Column({ nullable: true })
  stripe_account_id?: string | null;

  @ApiProperty({ example: '3235534022' })
  @IsOptional()
  @Index()
  @Column({ type: 'bigint', nullable: true })
  @Validate(IsNotExist, ['User'], {
    message: 'phone number already exists',
    groups: [CrudValidationGroups.CREATE],
  })
  phone_no: number | null;

  @ApiProperty({ example: '1' })
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  country_code: number | null;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: true })
  @Column({ type: 'bool', nullable: true })
  is_guide?: boolean;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: true })
  @Column({ type: 'bool', nullable: true })
  is_traveller?: boolean;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: true })
  @Column({ type: 'bool', nullable: false, default: 'FALSE' })
  is_for_the_planet?: boolean;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: true })
  @Column({ type: 'bool', nullable: false, default: 'FALSE' })
  is_first_aid_trained?: boolean;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: false })
  @Column({ type: 'bool', nullable: true, default: false })
  is_subadmin_guide?: boolean;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: false })
  @Column({ type: 'bool', nullable: true, default: false })
  is_subadmin_nonprofit?: boolean;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: false })
  @Column({ type: 'bool', nullable: true, default: false })
  is_subadmin_others?: boolean;

  @IsOptional()
  @ApiProperty({ example: 'about' })
  @Column({
    type: 'text',
    nullable: true,
  })
  about?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: true })
  @Column({ type: 'bool', nullable: false, default: 'FALSE' })
  is_terms_conditions_agreed?: boolean;

  @IsOptional()
  @ApiProperty({ example: 'waiver' })
  @Column({
    type: 'text',
    nullable: true,
  })
  release_waiver_data?: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column({ nullable: true })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Validate(IsExist, ['UserType', 'id'], {
    message: 'User Type not Found',
  })
  user_type_id?: string | null;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column({ nullable: true })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Validate(IsExist, ['Badge', 'id'], {
    message: 'Badge not Found',
  })
  badge_id?: string | null;

  public previousPassword: string;
  userType: UserType;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Column({ default: AuthProvidersEnum.email })
  provider: string;

  @Index()
  @Column({ nullable: true })
  socialId: string | null;

  @IsOptional()
  @ApiProperty({ example: 'profile_photo_firebase_url' })
  @Column({
    type: 'text',
    nullable: true,
  })
  profile_photo_firebase_url: string | null;

  @ApiProperty({ example: 'fileEntity' })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  photo?: FileEntity | null;

  @Allow()
  @IsOptional({
    groups: [CrudValidationGroups.UPDATE, CrudValidationGroups.CREATE],
  })
  @ApiProperty({ example: 'byte64image' })
  @Transform((value: Buffer | null | string) => (value == null ? '' : value))
  @Column({
    name: 'profile_photo',
    type: 'bytea',
    nullable: true,
  })
  profile_photo?: Buffer | null | string;
  @BeforeUpdate()
  @BeforeInsert()
  public encodeImage() {
    this.profile_photo = this.profile_photo
      ? base64_arraybuffer.base64_2_ab(this.profile_photo)
      : '';
  }

  @AfterLoad()
  public async decodeImage() {
    try {
      if (typeof this.profile_photo !== null && this.profile_photo != undefined) {
        this.profile_photo = await base64_arraybuffer.ab_2_base64(
          new Uint8Array(base64_arraybuffer.base64_2_ab(this.profile_photo)),
        );
      }
    } catch (e) {}
  }


  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
    groups: [CrudValidationGroups.CREATE],
  })
  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  @Index()
  hash: string | null;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: true })
  @Column({ type: 'bool', nullable: false, default: 'FALSE' })
  is_verified?: boolean;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: true })
  @Column({ type: 'bool', nullable: false, default: 'FALSE' })
  is_online?: boolean;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @IsOptional()
  @DeleteDateColumn()
  deleted_at: Date;
}
