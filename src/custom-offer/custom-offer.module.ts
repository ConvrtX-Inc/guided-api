import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomOffer } from './custom-offer.entity';
import { CustomOfferService } from './custom-offer.service';
import { CustomOfferController } from './custom-offer.controller';

@Module({
  controllers: [CustomOfferController],
  providers: [CustomOfferService],
  imports: [TypeOrmModule.forFeature([CustomOffer])],
})
export class CustomOfferModule {}
