import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { AuthAppleService } from './auth-apple.service';
import { AuthAppleLoginDto } from './dtos/auth-apple-login.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth/apple',
  version: '1',
})
export class AuthAppleController {
  constructor(
    public authService: AuthService,
    public authAppleService: AuthAppleService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: AuthAppleLoginDto) {
    const socialData = await this.authAppleService.getProfileByToken(loginDto);
    if (socialData.id != '') {
      return this.authService.validateSocialLogin('apple', socialData);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            details: 'Something went wrong!',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
