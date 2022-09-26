import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthAppleController } from './auth-apple.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AppleStrategy } from './apple.strategy';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [AppleStrategy],
  controllers: [AuthAppleController],
})
export class AuthAppleModule {}
