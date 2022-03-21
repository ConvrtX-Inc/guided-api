import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { SocialInterface } from '../social/interfaces/social.interface';
import { AuthGoogleLoginDto } from './dtos/auth-google-login.dto';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthGoogleService {
  private google: OAuth2Client;

  constructor(private configService: ConfigService) {
    this.google = new OAuth2Client(
      configService.get('google.clientId'),
      configService.get('google.clientSecret'),
    );
  }

  async getProfileByToken(
    loginDto: AuthGoogleLoginDto,
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
        firstName: data.given_name,
        lastName: data.family_name,
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
