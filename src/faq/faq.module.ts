import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faq } from './faq.entity';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';

@Module({
  controllers: [FaqController],
  providers: [FaqService],
  imports: [TypeOrmModule.forFeature([Faq])],
})
export class FaqModule {}
