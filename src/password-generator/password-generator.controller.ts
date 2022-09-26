import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TemporaryPasswordDto } from './dtos/temporary-password.dto';
import { PasswordGeneratorService } from './password-generator.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Password Generator')
@Controller({
  path: 'password-generator',
  version: '1',
})
export class PasswordGeneratorController {
  constructor(private service: PasswordGeneratorService) {}

  @Get()
  @ApiOperation({ summary: 'generate random password' })
  getPassword() {
    return this.service.generatePassword();
  }

  @Post('/send-password')
  @ApiOperation({ summary: 'send temporary password to email' })
  sendPassword(@Body() body: TemporaryPasswordDto) {
    return this.service.sendTemporaryPassword(body);
  }
}
