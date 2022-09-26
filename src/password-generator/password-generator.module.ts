import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { PasswordGeneratorController } from './password-generator.controller';
import { PasswordGeneratorService } from './password-generator.service';

@Module({
  controllers: [PasswordGeneratorController],
  providers: [PasswordGeneratorService],
  imports: [MailModule],
})
export class PasswordGeneratorModule {}
