import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Allow, IsNotEmpty, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FcmDeviceToken extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '2cc5bcab-b726-43a2-98e8-98baa5fce9b4' })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Validate(IsExist, ['User', 'id'], {
    message: 'User not Found',
  })
  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Allow()
  @ApiProperty({ example: '08b79d9f' })
  @Column({ nullable: false, type: 'text' })
  device_token: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;
}
