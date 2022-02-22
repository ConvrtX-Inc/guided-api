import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileQuestionController } from './user-profile-question.controller';
import { UserProfileQuestionService } from './user-profile-question.service';
import { UserProfileQuestion } from './user-profile-question.entity';
import { User } from '../users/user.entity';

@Module({
  controllers: [UserProfileQuestionController],
  providers: [UserProfileQuestionService],
  imports: [    
    TypeOrmModule.forFeature([UserProfileQuestion, User]),
  ],
  exports: [UserProfileQuestionService]
})
export class UserProfileQuestionModule {}

