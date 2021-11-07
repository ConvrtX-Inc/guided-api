import { Module } from '@nestjs/common';
import { BadgeController } from './badge.controller';
import { BadgeService } from './badge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Badge } from './badge.entity';

@Module({
  controllers: [BadgeController],
  providers: [BadgeService],
  imports: [TypeOrmModule.forFeature([Badge])],
})
export class BadgeModule {}
