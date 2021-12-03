import { Module } from '@nestjs/common';
import { ActivityAdvertisementService } from './activityAdvertisement.service';
import { ActivityAdvertisementController } from './activityAdvertisement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityAdvertisement } from './entities/activityAdvertisement.entity';

@Module({
  controllers: [ActivityAdvertisementController],
  providers: [ActivityAdvertisementService],
  imports: [TypeOrmModule.forFeature([ActivityAdvertisement])], 
  exports: [ActivityAdvertisementService]
})
export class ActivityAdvertisementModule {}
