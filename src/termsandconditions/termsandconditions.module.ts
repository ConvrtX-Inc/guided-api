import { Module } from '@nestjs/common';
import { TermsandconditionsService } from './termsandconditions.service';
import { TermsandconditionsController } from './termsandconditions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Termsandcondition } from './entities/termsandcondition.entity';

@Module({
  controllers: [TermsandconditionsController],
  providers: [TermsandconditionsService],
  imports: [TypeOrmModule.forFeature([Termsandcondition])]
})
export class TermsandconditionsModule {}
