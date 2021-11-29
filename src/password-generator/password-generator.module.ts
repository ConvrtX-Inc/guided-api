import { Module } from '@nestjs/common';
import { PasswordGeneratorController } from './password-generator.controller';
import { PasswordGeneratorService } from './password-generator.service';

@Module({
  controllers: [PasswordGeneratorController],
  providers: [PasswordGeneratorService]
})
export class PasswordGeneratorModule {}
