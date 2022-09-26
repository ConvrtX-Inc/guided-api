import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { TemporaryPasswordDto } from './dtos/temporary-password.dto';

@Injectable()
export class PasswordGeneratorService {
  constructor(private mailService: MailService) {}

  generatePassword() {
    const generator = require('generate-password');

    const randompassword = generator.generate({
      length: 10,
      numbers: true,
    });

    return {
      password: randompassword,
    };
  }

  sendTemporaryPassword(tempPassword: TemporaryPasswordDto) {
    return this.mailService.sendTempPassword(
      tempPassword.email,
      tempPassword.password,
    );
  }
}
