import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { TemporaryPasswordDto } from './dtos/temporary-password.dto';

@Injectable()
export class PasswordGeneratorService {
  constructor(private mailService: MailService) {}

  generatePassword() {
    var generator = require('generate-password');

    var randompassword = generator.generate({
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
