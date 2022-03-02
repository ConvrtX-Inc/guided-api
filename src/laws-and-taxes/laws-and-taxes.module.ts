import { Module } from '@nestjs/common';
import { LawsAndTaxesController } from './laws-and-taxes.controller';
import { LawsAndTaxesService } from './laws-and-taxes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LawsAndTaxes } from './laws-and-taxes.entity';

@Module({
  controllers: [LawsAndTaxesController],
  providers: [LawsAndTaxesService],
  imports: [TypeOrmModule.forFeature([LawsAndTaxes])],
})
export class LawsAndTaxesModule {}
