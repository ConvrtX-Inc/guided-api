import { Module } from '@nestjs/common';
import { GuidelinesService } from './guidelines.service';
import { GuidelinesController } from './guidelines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guideline } from './entities/guideline.entity';

@Module({
  controllers: [GuidelinesController],
  providers: [GuidelinesService],
  imports: [TypeOrmModule.forFeature([Guideline])]
})
export class GuidelinesModule {}
