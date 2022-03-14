import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './country.entity';

@Module({
  controllers: [CountryController],
  providers: [CountryService],
  imports: [TypeOrmModule.forFeature([Country])],
  exports: [CountryService],
})
export class CountryModule {}
