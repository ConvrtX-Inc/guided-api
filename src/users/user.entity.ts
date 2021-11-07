import {
  Column,
  AfterLoad,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  Generated, DeleteDateColumn,
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
import { EntityHelper } from 'src/utils/entity-helper';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
import { CrudValidationGroups } from '@nestjsx/crud';
import { UserType } from '../user-type/userType.entity';

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Index()
  @Column({ nullable: true })
  first_name: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
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

  @ApiProperty({ example: '3235534022' })
  @IsOptional()
  @Index()
  @Column({ type: 'bigint', nullable: true })
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
  @Generated('uuid')
  user_type_id?: string;

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

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  photo?: FileEntity | null;

  @ApiProperty({ type: Status })
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

  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date?: string;

  @IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date?: string;

  @IsOptional()
  @DeleteDateColumn()
  deletedAt: Date;
}
