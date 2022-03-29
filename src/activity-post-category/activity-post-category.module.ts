import { Module } from '@nestjs/common';
import { ActivityPostCategoryController } from './activity-post-category.controller';
import { ActivityPostCategoryService } from './activity-post-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityPostCategory } from './activity-post-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityPostCategory])],
  controllers: [ActivityPostCategoryController],
  providers: [ActivityPostCategoryService],
  exports: [ActivityPostCategoryService],
})
export class ActivityPostCategoryModule {}
