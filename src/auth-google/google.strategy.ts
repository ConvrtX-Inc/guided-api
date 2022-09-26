import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { SocialData } from '../social/interfaces/social.data';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get('google.clientId'),
      clientSecret: configService.get('google.clientSecret'),
    });
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: Record<string, unknown>,
  ) {
    return await this.authService.validateSocialLogin(
      'apple',
      new SocialData(profile),
    );
  }
}
