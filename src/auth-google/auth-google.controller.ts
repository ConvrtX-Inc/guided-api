import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AppUser } from '../auth/current-user.decorator';
import { User } from '../users/user.entity';
import { TokenService } from '../auth/token.service';
import { AuthGoogleLoginDto } from './dtos/auth-google-login.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth/google',
  version: '1',
})
export class AuthGoogleController {
  constructor(public readonly tokenService: TokenService) {}

  @ApiBody({ type: AuthGoogleLoginDto })
  @UseGuards(AuthGuard('google'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@AppUser() user: User) {
    return this.tokenService.generateToken(user);
  }
}
