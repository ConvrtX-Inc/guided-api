import { Module } from '@nestjs/common';
import { ActivityOutfitterImageService } from './activity-outfitter-image.service';
import { ActivityOutfitterImageController } from './activity-outfitter-image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityOutfitterImage } from './entities/activity-outfitter-image.entity';

@Module({
  controllers: [ActivityOutfitterImageController],
  providers: [ActivityOutfitterImageService],
  imports: [TypeOrmModule.forFeature([ActivityOutfitterImage])]
})
export class ActivityOutfitterImageModule {}
