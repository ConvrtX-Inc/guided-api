import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class Certificate extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column()
  @Generated('uuid')
  user_id?: string;

  @IsOptional()
  @ApiProperty({ example: 'Certificate Name' })
  @Column({ nullable: false, length: 200 })
  certificate_name?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'Certificate Description' })
  @Column({ type: 'text' })
  certificate_description?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 'byte64image' })
  @Column({
    name: 'img_snapshot',
    type: 'bytea',
    nullable: true,
  })
  img_snapshot?: Buffer;
}
