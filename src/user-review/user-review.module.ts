import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserReviewCrudService } from './user-review-crud.service';
import { UserReviewController } from './user-review.controller';
import { UserReview } from './user-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserReview])],
  controllers: [UserReviewController],
  providers: [UserReviewCrudService],
  exports: [UserReviewCrudService],
})
export class UserReviewModule {}
