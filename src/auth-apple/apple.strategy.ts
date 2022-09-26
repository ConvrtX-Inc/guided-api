import { Strategy } from 'passport-apple';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { SocialData } from '../social/interfaces/social.data';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get('apple.clientID'),
      teamID: configService.get('apple.teamID'),
      keyID: configService.get('apple.keyID'),
      privateKeyLocation: configService.get('apple.privateKeyLocation'),
    });
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    idToken: string,
    profile: Record<string, unknown>,
  ) {
    return await this.authService.validateSocialLogin(
      'apple',
      new SocialData(profile),
    );
  }
}
