import { Module } from '@nestjs/common';
import { UsersTermsAndConditionsService } from './users-terms-and-conditions.service';
import { UsersTermsAndConditionsController } from './users-terms-and-conditions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersTermsAndCondition } from './users-terms-and-condition.entity';

@Module({
  controllers: [UsersTermsAndConditionsController],
  providers: [UsersTermsAndConditionsService],
  imports: [TypeOrmModule.forFeature([UsersTermsAndCondition])],
})
export class UsersTermsAndConditionsModule {}
