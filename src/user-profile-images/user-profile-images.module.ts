import { Module } from '@nestjs/common';
import { UserProfileImagesService } from './user-profile-images.service';
import { UserProfileImagesController } from './user-profile-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileImage } from './user-profile-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfileImage])],
  controllers: [UserProfileImagesController],
  providers: [UserProfileImagesService]
})
export class UserProfileImagesModule {}
