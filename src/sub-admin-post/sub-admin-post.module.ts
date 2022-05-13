import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityArticleImage } from 'src/activity-article-image/activity-article-image.entity';
import { ActivityArticle } from 'src/activity-article/activity-article.entity';
import { ActivityPost } from 'src/activity-post/activity-post.entity';
import { User } from 'src/users/user.entity';
import { SubAdminPostController } from './sub-admin-post.controller';
import { SubAdminPostService } from './sub-admin-post.service';

@Module({
  controllers: [SubAdminPostController],
  providers: [SubAdminPostService],
  imports: [
    TypeOrmModule.forFeature([
      ActivityPost,
      ActivityArticle,
      ActivityArticleImage,
      User,
    ]),
  ],
})
export class SubAdminPostModule {}
