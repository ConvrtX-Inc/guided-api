import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityArticleController } from './activity-article.controller';
import { ActivityArticleService } from './activity-article.service';
import { ActivityArticle } from './activity-article.entity';

@Module({
  controllers: [ActivityArticleController],
  providers: [ActivityArticleService],
  imports: [    
    TypeOrmModule.forFeature([ActivityArticle]),
  ],
  exports: [ActivityArticleService]
})
export class ActivityArticleModule {}

