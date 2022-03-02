import { Module } from '@nestjs/common';
import { RulesWhatToBringController } from './rules-what-to-bring.controller';
import { RulesWhatToBringService } from './rules-what-to-bring.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RulesWhatToBring } from './rules-what-to-bring.entity';

@Module({
  controllers: [RulesWhatToBringController],
  providers: [RulesWhatToBringService],
  imports: [TypeOrmModule.forFeature([RulesWhatToBring])],
})
export class RulesWhatToBringModule {}
