import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthGoogleController } from './auth-google.controller';
import { AuthModule } from 'src/auth/auth.module';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [GoogleStrategy],
  controllers: [AuthGoogleController],
})
export class AuthGoogleModule {}
