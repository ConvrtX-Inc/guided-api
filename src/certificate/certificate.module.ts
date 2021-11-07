import { Module } from '@nestjs/common';
import { CertificateController } from './certificate.controller';
import { CertificateService } from './certificate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from './certificate.entity';

@Module({
  controllers: [CertificateController],
  providers: [CertificateService],
  imports: [TypeOrmModule.forFeature([Certificate])],
})
export class CertificateModule {}
