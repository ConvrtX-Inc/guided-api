import { Module } from '@nestjs/common';
import { ActivityOutfitterService } from './activityOutfitter.service';
import { ActivityOutfitterController } from './activityOutfitter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityOutfitter } from './entities/activityOutfitter.entity';

@Module({
  controllers: [ActivityOutfitterController],
  providers: [ActivityOutfitterService],
  imports: [TypeOrmModule.forFeature([ActivityOutfitter])],
})
export class ActivityOutfitterModule {}
