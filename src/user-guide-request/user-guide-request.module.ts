import { Module } from '@nestjs/common';
import { UserGuideRequestService } from './user-guide-request.service';
import { UserGuideRequestController } from './user-guide-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGuideRequest } from './user-guide-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserGuideRequest])],
  controllers: [UserGuideRequestController],
  providers: [UserGuideRequestService]
})
export class UserGuideRequestModule {}
