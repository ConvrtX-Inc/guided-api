import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PasswordGeneratorService } from './password-generator.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Password Generator')
@Controller('password-generator')
export class PasswordGeneratorController {
  constructor(private service: PasswordGeneratorService) {}

  @Get()
  getPassword() {
    return this.service.generatePassword();
  }
}
