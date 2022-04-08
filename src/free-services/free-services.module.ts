import { Module } from '@nestjs/common';
import { FreeServicesController } from './free-services.controller';
import { FreeServicesService } from './free-services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreeServices } from './free-services.entity';

@Module({
  controllers: [FreeServicesController],
  providers: [FreeServicesService],
  imports: [TypeOrmModule.forFeature([FreeServices])],
  exports: [FreeServicesService]
})
export class FreeServicesModule {}
