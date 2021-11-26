import { Module } from '@nestjs/common';
import { TravelerReleaseService } from './traveler-release.service';
import { TravelerReleaseController } from './traveler-release.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelerRelease } from './entities/traveler-release.entity';

@Module({
  controllers: [TravelerReleaseController],
  providers: [TravelerReleaseService],
  imports:[TypeOrmModule.forFeature([TravelerRelease])]
})
export class TravelerReleaseModule {}
