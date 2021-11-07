import { Module } from '@nestjs/common';
import { ActivityAdvertisementImageService } from './activityAdvertisementImage.service';
import { ActivityAdvertisementImageController } from './activityAdvertisementImage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityAdvertisementImage } from './entities/activityAdvertisementImage.entity';

@Module({
  controllers: [ActivityAdvertisementImageController],
  providers: [ActivityAdvertisementImageService],
  imports: [TypeOrmModule.forFeature([ActivityAdvertisementImage])]
})
export class ActivityAdvertisementImageModule {}
