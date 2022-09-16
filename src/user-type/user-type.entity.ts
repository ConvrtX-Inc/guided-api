import {Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, Validate } from 'class-validator';
import { EntityHelper } from '../utils/entity-helper';
import { IsNotExist } from '../utils/validators/is-not-exists.validator';
import { UserTypeName } from './enums/user-type-name.enum';

@Entity()
export class UserType extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'Guide' })
  @Validate(IsNotExist, ['UserType'], {
    message: 'nameAlreadyExists',
  })
  @Column({ length: 100 })
  name?: string | UserTypeName;

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
