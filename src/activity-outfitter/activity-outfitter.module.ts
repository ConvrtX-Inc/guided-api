import { Module } from '@nestjs/common';
import { ActivityOutfitterService } from './activity-outfitter.service';
import { ActivityOutfitterController } from './activity-outfitter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityOutfitter } from './entities/activityOutfitter.entity';

@Module({
  controllers: [ActivityOutfitterController],
  providers: [ActivityOutfitterService],
  imports: [TypeOrmModule.forFeature([ActivityOutfitter])],
  exports: [ActivityOutfitterService],
})
export class ActivityOutfitterModule {}
