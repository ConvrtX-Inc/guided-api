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
import stripeConfig from './config/stripe.config';
import * as path from 'path';
import { TwilioModule } from 'nestjs-twilio';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthAppleModule } from './auth-apple/auth-apple.module';
import { AuthFacebookModule } from './auth-facebook/auth-facebook.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';
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
import { ActivityPackageModule } from './activity-package/activity-package.module';
import { ActivityPackageDestinationModule } from './activity-package-destination/activity-package-destination.module';
import { ActivityPackageDestinationImageModule } from './activity-package-destination-image/activity-package-destination-image.module';
import { NearbyActivitiesModule } from './nearby-activities/nearby-activities.module';
import { ActivityAvailabilityModule } from './activity-availability/activity-availability.module';
import { ActivityAvailabilityHoursModule } from './activity-availability-hours/activity-availability-hours.module';
import { ActivityPackageFormsModule } from './activity-package-forms/activity-package-forms.module';
import { ActivityEventModule } from './activity-event/activity-event.module';
import { ActivityPostCategoryModule } from './activity-post-category/activity-post-category.module';
import { UserTypeModule } from './user-type/user-type.module';
import { StatusModule } from './statuses/status.module';
import { FreeServicesModule } from './free-services/free-services.module';
import { CertificateModule } from './certificate/certificate.module';
import { BookingRequestModule } from './booking-request/booking-request.module';
import { NotificationModule } from './notification/notification.module';
import { MessagesModule } from './messages/messages.module';
import { TransactionModule } from './transaction/transaction.module';
import { OfferModule } from './offer/offer.module';
import { ActivityOutfitterModule } from './activity-outfitter/activity-outfitter.module';
import { ActivityOutfitterImageModule } from './activity-outfitter-image/activity-outfitter-image.module';
import { ActivityAdvertisementModule } from './activity-advertisement/activity-advertisement.module';
import { ActivityAdvertisementImageModule } from './activity-advertisement-image/activity-advertisement-image.module';
import { GuidelinesModule } from './guidelines/guidelines.module';
import { PasswordGeneratorModule } from './password-generator/password-generator.module';
import { UserScheduleAvailabilityModule } from './user-schedule-availability/user-schedule-availability.module';
import { DashboardRelatedModule } from './dashboard-related/dashboard-related.module';
import { ActivityPostModule } from './activity-post/activity-post.module';
import { ActivityNewsfeedModule } from './activity-newsfeed/activity-newsfeed.module';
import { ActivityArticleModule } from './activity-article/activity-article.module';
import { CustomOfferModule } from './custom-offer/custom-offer.module';
import { CardModule } from './card/card.module';
import { BankAccountModule } from './bank-account/bank-account.module';
import { UserReviewModule } from './user-review/user-review.module';
import { ChatModule } from './messenger/chat/chat.module';
import { ParticipantModule } from './messenger/participant/participant.module';
import { RoomModule } from './messenger/room/room.module';
import { MessageModule } from './messenger/message/message.module';
import { MessageDetailModule } from './messenger/message-detail/message-detail.module';
import { UserProfileQuestionModule } from './user-profile-question/user-profile-question.module';
import { UserSubscriptionModule } from './user-subscription/user-subscription.module';
import { WaiverModule } from './waiver/waiver.module';
import { RulesWhatToBringModule } from './rules-what-to-bring/rules-what-to-bring.module';
import { LawsAndTaxesModule } from './laws-and-taxes/laws-and-taxes.module';
import { SmsModule } from './sms/sms.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { FaqModule } from './faq/faq.module';
import { StripeModule } from './stripe/stripe.module';
import { ChargeModule } from './charge/charge.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { CountryModule } from './country/country.module';
import { TermsAndConditionsModule } from './terms-and-conditions/terms-and-conditions.module';
import { UserActivityPostSummaryModule } from './user-activity-post-summary/user-activity-post-summary.module';
import { UsersTermsAndConditionsModule } from './users-terms-and-conditions/users-terms-and-conditions.module';
import { ActivityArticleImageModule } from './activity-article-image/activity-article-image.module';
import { ActivityNewsfeedImageModule } from './activity-newsfeed-image/activity-newsfeed-image.module';
import { SubAdminPostModule } from './sub-admin-post/sub-admin-post.module';
import { PaymentIntentModule } from './payment-intent/payment-intent.module';
import { ActivityEventFormsModule } from './activity-event-forms/activity-event-forms.module';
import { ActivityEventDestinationModule } from './activity-event-destination/activity-event-destination.module';
import { ActivityEventDestinationImageModule } from './activity-event-destination-image/activity-event-destination-image.module';
import { ActivityEventImageModule } from './activity-event-image/activity-event-image.module';
import { UserProfileImagesModule } from './user-profile-images/user-profile-images.module';
import { TransactionPaymentModule } from './transaction-payment/transaction-payment.module';
import { StripeAccountsModule } from './stripe-accounts/stripe-accounts.module';
import { StripeTransferModule } from './stripe-transfer/stripe-transfer.module';
import { UserMessagesBlockModule } from './user-messages-block/user-messages-block.module';
import { UserAvailabilityModule } from './user-availability/user-availability.module';
import { UserGuideRequestModule } from './user-guide-request/user-guide-request.module';
import { BlockModule } from './block/block.module';
import { InboxModule } from './inbox/inbox.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { FcmModule } from './fcm/fcm.module';
import fcmConfig from './config/fcm.config';
import { FcmDeviceTokenModule } from './fcm-device-token/fcm-device-token.module';
import { BookingTransactionModule } from './booking-transaction/booking-transaction.module';
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
        stripeConfig,
        fcmConfig,
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
    CountryModule,
    SmsModule,
    UsersModule,
    CardModule,
    ChargeModule,
    StripeAccountsModule,
    StripeTransferModule,
    SubscriptionModule,
    StripeModule,
    FilesModule,
    AuthModule,
    AuthFacebookModule,
    AuthGoogleModule,
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
    NearbyActivitiesModule,
    ActivityAvailabilityModule,
    ActivityAvailabilityHoursModule,
    ActivityPackageFormsModule,
    ActivityEventModule,
    ActivityPostCategoryModule,
    UserTypeModule,
    StatusModule,
    FreeServicesModule,
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
    CustomOfferModule,
    UserReviewModule,
    ParticipantModule,
    ChatModule,
    RoomModule,
    MessageModule,
    MessageDetailModule,
    UserProfileQuestionModule,
    UserSubscriptionModule,
    WaiverModule,
    RulesWhatToBringModule,
    LawsAndTaxesModule,
    ContactUsModule,
    FaqModule,
    TermsAndConditionsModule,
    BankAccountModule,
    UserActivityPostSummaryModule,
    UsersTermsAndConditionsModule,
    ActivityArticleImageModule,
    ActivityNewsfeedImageModule,
    SubAdminPostModule,
    PaymentIntentModule,
    ActivityEventFormsModule,
    ActivityEventDestinationModule,
    ActivityEventDestinationImageModule,
    ActivityEventImageModule,
    UserProfileImagesModule,
    TransactionPaymentModule,
    UserMessagesBlockModule,
    UserAvailabilityModule,
    UserGuideRequestModule,
    BlockModule,
    InboxModule,
    WishlistModule,
    FcmModule,
    FcmDeviceTokenModule,
    BookingTransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
