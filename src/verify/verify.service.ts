import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { CheckVerificationTokenDTO } from './dto/CheckVerificationToken.dto';
import { SendVerificationTokenDTO } from './dto/SendVerificationToken.dto';
import { Verify } from './verify.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VerifyService {
  constructor(
    @InjectTwilio() private readonly client: TwilioClient,
    private usersService: UsersService,
  ) {}

  async sendPhoneVerificationToken(
    dto: SendVerificationTokenDTO,
  ): Promise<Verify> {
    try {
      const res = await this.client.verify
        .services(process.env.TWILIO_VERIFICATION_SERVICE_SID)
        .verifications.create({
          to: dto.phone_number,
          channel: 'sms',
        });

      const v = new Verify();
      v.id = res.sid;
      v.phone_number = res.to;
      v.status = res.status;
      v.expired_in = res.sendCodeAttempts[0]['time'];
      return v;
    } catch (error) {
      throw new HttpException(
        'Send Verification failure!' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async CheckPhoneVerificationToken(
    request: CheckVerificationTokenDTO,
  ): Promise<Verify> {
    try {
      const res = await this.client.verify
        .services(process.env.TWILIO_VERIFICATION_SERVICE_SID)
        .verificationChecks.create({
          to: request.phone_number,
          code: request.verifyCode,
        });

      const user = await this.usersService.findOneEntity({
        where: {
          phone_no: request.phone_number,
        },
      });
      user.is_verified = true;
      await user.save();

      const v = new Verify();
      v.id = res.sid;
      v.phone_number = res.to;
      v.status = res.status;
      v.expired_in = null;
      return v;
    } catch (error) {
      throw new HttpException(
        'Check Verification failure!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
