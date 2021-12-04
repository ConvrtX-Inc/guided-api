import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './config/mail.config';
import fileConfig from './config/file.config';
import facebookConfig from './config/facebook.config';
import googleConfig from './config/google.config';
import twitterConfig from './config/twitter.config';
import appleConfig from './config/apple.config';
import * as path from 'path';
import { TwilioModule } from 'nestjs-twilio';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthAppleModule } from './auth-apple/auth-apple.module';
import { AuthFacebookModule } from './auth-facebook/auth-facebook.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { AuthTwitterModule } from './auth-twitter/auth-twitter.module';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { I18nJsonParser } from 'nestjs-i18n/dist/parsers/i18n.json.parser';
import { HeaderResolver } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MailConfigService } from './mail/mail-config.service';
import { ForgotModule } from './forgot/forgot.module';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { CurrencyModule } from './currency/currency.module';
import { VerifyModule } from './verify/verify.module';
import { BadgeModule } from './badge/badge.module';
import { ActivityPackageModule } from './activity-package/activityPackage.module';
import { ActivityPackageDestinationModule } from './activity-package-destination/activityPackageDestination.module';
import { ActivityPackageDestinationImageModule } from './activity-package-destination-image/activityPackageDestinationImage.module';
import { ActivityAvailabilityModule } from './activity-availability/activityAvailability.module';
import { ActivityAvailabilityHoursModule } from './activity-availability-hours/activityAvailabilityHours.module';
import { ActivityPackageFormsModule } from './activity-package-forms/activityPackageForms.module';
import { ActivityEventModule } from './activity-event/activityEvent.module';
import { UserTypeModule } from './user-type/userType.module';
import { StatusModule } from './statuses/status.module';
import { CertificateModule } from './certificate/certificate.module';
import { BookingRequestModule } from './booking-request/bookingRequest.module';
import { NotificationModule } from './notification/notification.module';
import { MessagesModule } from './messages/messages.module';
import { TransactionModule } from './transaction/transaction.module';
import { OfferModule } from './offer/offer.module';
import { ActivityOutfitterModule } from './activity-outfitter/activityOutfitter.module';
import { ActivityOutfitterImageModule } from './activity-outfitter-image/activityOutfitterImage.module';
import { ActivityAdvertisementModule } from './activity-advertisement/activityAdvertisement.module';
import { ActivityAdvertisementImageModule } from './activity-advertisement-image/activityAdvertisementImage.module';
import { GuidelinesModule } from './guidelines/guidelines.module';
import { PasswordGeneratorModule } from './password-generator/password-generator.module';
import { UserScheduleAvailabilityModule } from './user-schedule-availability/user-schedule-availability.module';
import { DashboardRelatedModule } from './dashboard-related/dashboard-related.module';
import { ActivityPostModule } from './activity-post/activity-post.module';
import { ActivityNewsfeedModule } from './activity-newsfeed/activity-newsfeed.module';
import { ActivityArticleModule } from './activity-article/activity-article.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        facebookConfig,
        googleConfig,
        twitterConfig,
        appleConfig,
      ],
      envFilePath: ['.env'],
    }),
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get('app.fallbackLanguage'),
        parserOptions: {
          path: path.join(
            configService.get('app.workingDirectory'),
            'src',
            'i18n',
            'translations',
          ),
        },
      }),
      parser: I18nJsonParser,
      inject: [ConfigService],
      resolvers: [new HeaderResolver(['x-custom-lang'])],
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    AuthFacebookModule,
    AuthGoogleModule,
    AuthTwitterModule,
    AuthAppleModule,
    ForgotModule,
    MailModule,
    HomeModule,
    CurrencyModule,
    VerifyModule,
    BadgeModule,
    ActivityPackageModule,
    ActivityPackageDestinationModule,
    ActivityPackageDestinationImageModule,
    ActivityAvailabilityModule,
    ActivityAvailabilityHoursModule,
    ActivityPackageFormsModule,
    ActivityEventModule,
    UserTypeModule,
    StatusModule,
    CertificateModule,
    BookingRequestModule,
    NotificationModule,
    MessagesModule,
    TransactionModule,
    OfferModule,
    ActivityOutfitterModule,
    ActivityOutfitterImageModule,
    ActivityAdvertisementModule,
    ActivityAdvertisementImageModule,
    GuidelinesModule,
    PasswordGeneratorModule,
    UserScheduleAvailabilityModule,
    DashboardRelatedModule,
    ActivityPostModule,
    ActivityNewsfeedModule,
    ActivityArticleModule,
  ],
})
export class AppModule {}
