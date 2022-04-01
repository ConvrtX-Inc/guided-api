import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityArticleImageController } from './activity-article-image.controller';
import { ActivityArticleImageService } from './activity-article-image.service';
import { ActivityArticleImage } from './activity-article-image.entity';

@Module({
  controllers: [ActivityArticleImageController],
  providers: [ActivityArticleImageService],
  imports: [TypeOrmModule.forFeature([ActivityArticleImage])],
})
export class ActivityArticleImageModule {}
