import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CheckVerificationTokenDTO } from './dto/CheckVerificationToken.dto';
import { SendVerificationTokenDTO } from './dto/SendVerificationToken.dto';
import { VerifyService } from './verify.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Verify')
@Controller({
  path: 'auth/verify',
  version: '1',
})
export class VerifyController {
  constructor(public verifyService: VerifyService) {}

  @Post('mobile/send')
  @HttpCode(HttpStatus.CREATED)
  public async sendPhoneVerificationToken(
    @Body() sendVerificationTokenDTO: SendVerificationTokenDTO,
  ) {
    return this.verifyService.sendPhoneVerificationToken(
      sendVerificationTokenDTO,
    );
  }

  @Post('mobile/check')
  async checkMobileVerificationToken(
    @Body() request: CheckVerificationTokenDTO,
  ) {
    return this.verifyService.CheckPhoneVerificationToken(request);
  }
}
