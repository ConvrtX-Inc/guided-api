import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactUs } from './contact-us.entity';
import { ContactUsController } from './contact-us.controller';
import { ContactUsService } from './contact-us.service';

@Module({
  controllers: [ContactUsController],
  providers: [ContactUsService],
  imports: [ TypeOrmModule.forFeature([ContactUs])]
})
export class ContactUsModule {}

