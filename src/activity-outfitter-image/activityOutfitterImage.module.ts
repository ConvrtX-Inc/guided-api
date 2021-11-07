import { Module } from '@nestjs/common';
import { ActivityOutfitterImageService } from './activityOutfitterImage.service';
import { ActivityOutfitterImageController } from './activityOutfitterImage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityOutfitterImage } from './entities/activityOutfitterImage.entity';

@Module({
  controllers: [ActivityOutfitterImageController],
  providers: [ActivityOutfitterImageService],
  imports: [TypeOrmModule.forFeature([ActivityOutfitterImage])]
})
export class ActivityOutfitterImageModule {}
