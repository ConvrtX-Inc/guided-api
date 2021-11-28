import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordGeneratorService {
  generatePassword() {
    var generator = require('generate-password');

    var randompassword = generator.generate({
      length: 10,
      numbers: true,
    });

    return {
      password: randompassword
    };
  }
}
