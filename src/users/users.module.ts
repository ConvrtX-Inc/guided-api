import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserTypeModule } from 'src/user-type/userType.module';
import { UsersCrudService } from './users-crud.service';

@Module({
  imports: [UserTypeModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersCrudService],
  exports: [UsersService, UsersCrudService],
})
export class UsersModule {}
