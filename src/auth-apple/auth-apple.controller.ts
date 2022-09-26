import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthAppleLoginDto } from './dtos/auth-apple-login.dto';
import { TokenService } from '../auth/token.service';
import { AppUser } from '../auth/current-user.decorator';
import { User } from '../users/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller({
  path: 'auth/apple',
  version: '1',
})
export class AuthAppleController {
  constructor(public readonly tokenService: TokenService) {}

  @ApiBody({ type: AuthAppleLoginDto })
  @UseGuards(AuthGuard('apple'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@AppUser() user: User) {
    return this.tokenService.generateToken(user);
  }
}
