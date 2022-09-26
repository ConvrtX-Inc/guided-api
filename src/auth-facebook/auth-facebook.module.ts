import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthFacebookController } from './auth-facebook.controller';
import { AuthModule } from 'src/auth/auth.module';
import { FacebookStrategy } from './facebook.strategy';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [FacebookStrategy],
  controllers: [AuthFacebookController],
})
export class AuthFacebookModule {
}
