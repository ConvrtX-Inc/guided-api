import { Module } from '@nestjs/common';
import { UserAvailabilityService } from './user-availability.service';
import { UserAvailabilityController } from './user-availability.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAvailability } from './user-availability.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAvailability])],
  controllers: [UserAvailabilityController],
  providers: [UserAvailabilityService]
})
export class UserAvailabilityModule {}
