import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  AfterLoad,
  AfterInsert,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityHelper } from '../utils/entity-helper';
import appConfig from '../config/app.config';

@Entity({ name: 'file' })
export class FileEntity extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @Column()
  path: string;

  @ApiProperty({ type: 'number', format: 'double' })
  @Column()
  size: number;

  @ApiProperty()
  @Allow()
  @Column()
  mimetype: string;

  @ApiProperty({ nullable: true })
  @Allow()
  @Column({ nullable: true, name: 'file_name' })
  fileName: string;

  @ApiProperty({ additionalProperties: true })
  @Column('simple-json', { name: 'meta_data', nullable: true })
  metaData: any;

  @AfterLoad()
  @AfterInsert()
  updatePath() {
    if (this.path.indexOf('/') === 0) {
      this.path = appConfig().backendDomain + this.path;
    }
  }
}
