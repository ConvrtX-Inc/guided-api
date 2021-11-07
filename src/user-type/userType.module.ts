import { Module } from '@nestjs/common';
import { UserTypeController } from './userType.controller';
import { UserTypeService } from './userType.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserType } from './userType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserType])],
  controllers: [UserTypeController],
  providers: [UserTypeService],
  exports: [UserTypeService],
})
export class UserTypeModule {}
