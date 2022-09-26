import { Strategy } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { SocialData } from '../social/interfaces/social.data';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get('facebook.appId'),
      clientSecret: configService.get('facebook.appSecret'),
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
