import { Module } from '@nestjs/common';
import { ActivityAdvertisementImageService } from './activity-advertisement-image.service';
import { ActivityAdvertisementImageController } from './activity-advertisement-image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityAdvertisementImage } from './entities/activity-advertisement-image.entity';

@Module({
  controllers: [ActivityAdvertisementImageController],
  providers: [ActivityAdvertisementImageService],
  imports: [TypeOrmModule.forFeature([ActivityAdvertisementImage])]
})
export class ActivityAdvertisementImageModule {}
