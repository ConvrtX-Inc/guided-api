import { Module } from '@nestjs/common';
import { WaiverController } from './waiver.controller';
import { WaiverService } from './waiver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Waiver } from './waiver.entity';

@Module({
  controllers: [WaiverController],
  providers: [WaiverService],
  imports: [TypeOrmModule.forFeature([Waiver])],
})
export class WaiverModule {}
