import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserTypeModule } from 'src/user-type/user-type.module';
import { UsersCrudService } from './users-crud.service';
import { FileEntity } from '../files/file.entity';

@Module({
  imports: [UserTypeModule, TypeOrmModule.forFeature([User, FileEntity])],
  controllers: [UsersController],
  providers: [UsersService, UsersCrudService],
  exports: [UsersService, UsersCrudService],
})
export class UsersModule {}
