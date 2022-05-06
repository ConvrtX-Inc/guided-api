import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import appleSigninAuth from 'apple-signin-auth';
import { ConfigService } from '@nestjs/config';
import { SocialInterface } from '../social/interfaces/social.interface';
import { AuthAppleLoginDto } from './dtos/auth-apple-login.dto';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthAppleService {
  constructor(private configService: ConfigService) {}

  async getProfileByToken(
    loginDto: AuthAppleLoginDto,
  ): Promise<SocialInterface> {
    try {
      let data = {
        sub: '',
        email: '',
        given_name: '',
        family_name: '',
      };
      data = await jwt_decode(loginDto.idToken);

      return {
        id: data.sub,
        email: data.email,
        firstName: '',
        lastName: '',
      };
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            details: 'Something went wrong!' + e,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
