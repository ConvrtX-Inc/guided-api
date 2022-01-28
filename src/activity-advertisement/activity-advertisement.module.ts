import { Module } from '@nestjs/common';
import { ActivityAdvertisementService } from './activity-advertisement.service';
import { ActivityAdvertisementController } from './activity-advertisement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityAdvertisement } from './entities/activity-advertisement.entity';

@Module({
  controllers: [ActivityAdvertisementController],
  providers: [ActivityAdvertisementService],
  imports: [TypeOrmModule.forFeature([ActivityAdvertisement])], 
  exports: [ActivityAdvertisementService]
})
export class ActivityAdvertisementModule {}
