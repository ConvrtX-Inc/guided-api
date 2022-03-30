import { Module } from '@nestjs/common';
import { ActivityAdvertisementService } from './activity-advertisement.service';
import { ActivityAdvertisementController } from './activity-advertisement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityAdvertisement } from './entities/activity-advertisement.entity';
import { StatusModule } from 'src/statuses/status.module';

@Module({
  controllers: [ActivityAdvertisementController],
  providers: [ActivityAdvertisementService],
  imports: [
    StatusModule,
    TypeOrmModule.forFeature([ActivityAdvertisement])
  ],
  exports: [ActivityAdvertisementService]
})
export class ActivityAdvertisementModule { }
