import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthEmailLoginDto } from './dtos/auth-email-login.dto';
import { AuthForgotPasswordDto } from './dtos/auth-forgot-password.dto';
import { AuthConfirmEmailDto } from './dtos/auth-confirm-email.dto';
import { AuthResetPasswordDto } from './dtos/auth-reset-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthRegisterLoginDto } from './dtos/auth-register-login.dto';
import { AuthSwitchUserTypeDto } from './dtos/switch-user-type.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(public service: AuthService) {}

  @Post('email/login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: AuthEmailLoginDto) {
    return this.service.validateLogin(loginDto, false);
  }

  @Post('email/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: AuthRegisterLoginDto) {
    return this.service.register(createUserDto);
  }

  @Post('email/confirm')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Body() confirmEmailDto: AuthConfirmEmailDto) {
    return this.service.confirmEmail(confirmEmailDto.hash);
  }

  @Post('forgot/password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: AuthForgotPasswordDto) {
    return this.service.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset/password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto) {
    return this.service.resetPassword(
      resetPasswordDto.hash,
      resetPasswordDto.password,
    );
  }

  @ApiBearerAuth()
  @Post('switch')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async switchUserType(
    @Request() request,
    @Body() userDto: AuthSwitchUserTypeDto,
  ) {
    return this.service.switchUserType(userDto, request.user);
  }
}
