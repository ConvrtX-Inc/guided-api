import { Module } from '@nestjs/common';
import { TermsAndConditionService } from './terms-and-conditions.service';
import { TermsAndConditionsController } from './terms-and-conditions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermsAndCondition } from './terms-and-condition.entity';

@Module({
  controllers: [TermsAndConditionsController],
  providers: [TermsAndConditionService],
  imports: [TypeOrmModule.forFeature([TermsAndCondition])],
})
export class TermsAndConditionsModule {}
