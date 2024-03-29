import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { UsersModule } from 'src/users/users.module';
import { ForgotModule } from 'src/forgot/forgot.module';
import { MailModule } from 'src/mail/mail.module';
import { UserTypeModule } from 'src/user-type/user-type.module';
import { VerifyModule } from 'src/verify/verify.module';
import { SmsModule } from 'src/sms/sms.module';
import { TokenService } from './token.service';

@Module({
  imports: [
    UsersModule,
    ForgotModule,
    VerifyModule,
    PassportModule,
    UserTypeModule,
    MailModule,
    SmsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('auth.secret'),
        signOptions: {
          expiresIn: configService.get('auth.expires'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [TokenService, AuthService, JwtStrategy, AnonymousStrategy],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
