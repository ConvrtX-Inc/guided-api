import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';
import { AuthEmailLoginDto } from './dtos/auth-email-login.dto';
import { AuthUpdateDto } from './dtos/auth-update.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import * as crypto from 'crypto';
import { AuthProvidersEnum } from './auth-providers.enum';
import { SocialData } from 'src/social/interfaces/social.data';
import { AuthRegisterLoginDto } from './dtos/auth-register-login.dto';
import { UsersCrudService } from '../users/users-crud.service';
import { ForgotService } from 'src/forgot/forgot.service';
import { MailService } from 'src/mail/mail.service';
import { AuthSwitchUserTypeDto } from './dtos/switch-user-type.dto';
import { UserTypeService } from 'src/user-type/user-type.service';
import { AuthForgotPasswordDto } from './dtos/auth-forgot-password.dto';
import { VerifyService } from 'src/verify/verify.service';
import { UsersService } from 'src/users/users.service';
import { SmsService } from 'src/sms/sms.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private verifyService: VerifyService,
    private usersCrudService: UsersCrudService,
    private usersService: UsersService,
    private userTypeService: UserTypeService,
    private forgotService: ForgotService,
    private mailService: MailService,
    private smsService: SmsService,
  ) {}

  async validateLogin(
    loginDto: AuthEmailLoginDto,
    onlyAdmin: boolean,
  ): Promise<{ token: string; user: User }> {
    const user = await this.usersCrudService.findOneEntity({
      where: {
        email: loginDto.email,
      },
    });

    if (!user || (user && onlyAdmin && user.userType.name != 'Admin')) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (user.provider !== AuthProvidersEnum.email) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: `needLoginViaProvider:${user.provider}`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    user['user_type_name'] = '';
    if (typeof user.user_type_id !== 'undefined' && user.user_type_id) {
      const userType = await this.userTypeService.findOneEntity({
        where: {
          id: user.user_type_id,
        },
      });
      if (userType) {
        user['user_type_name'] = userType.name;
      }
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
    });

    //Update is_online status for user
    await this.usersService.updateOnline(user.id, true);

    return { token, user: user };
  }

  async validateSocialLogin(
    authProvider: 'apple' | 'facebook' | 'google',
    socialData: SocialData,
  ): Promise<User> {
    const socialEmail = socialData.email?.toLowerCase();

    const userByEmail = await this.usersCrudService.findOneEntity({
      where: {
        email: socialEmail,
      },
    });
    if (!!userByEmail) {
      return userByEmail;
    }

    const user = await this.usersCrudService.findOneEntity({
      where: {
        socialId: socialData.id,
        provider: authProvider,
      },
    });

    if (user) {
      if (socialEmail && !userByEmail) {
        user.email = socialEmail;
      }
      return await this.usersCrudService.saveEntity(user);
    } else {
      const userType = await this.userTypeService.findOneEntity({
        where: {
          name: 'Guide',
        },
      });

      return await this.usersCrudService.saveEntity({
        email: socialEmail,
        first_name: socialData.firstName,
        last_name: socialData.lastName,
        socialId: socialData.id,
        provider: authProvider,
        user_type_id: userType ? userType.id : '',
      });
    }
  }

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    let userType = await this.userTypeService.findOneEntity({
      where: {
        name: dto.user_type,
      },
    });

    if (!userType) {
      userType = await this.userTypeService.findOneEntity({
        where: {
          name: 'Guide',
        },
      });
    }

    const user = await this.usersCrudService.saveEntity({
      ...dto,
      email: dto.email,
      user_type_id: userType ? userType.id : '',
      hash,
    });

    this.mailService
      .userSignUp({
        to: user.email,
        name: user.first_name,
        data: {
          hash,
        },
      })
      .catch(Logger.error);
  }

  async confirmEmail(hash: string): Promise<void> {
    const user = await this.usersCrudService.findOneEntity({
      where: {
        hash,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `notFound`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    user.hash = null;
    // user.status = plainToClass(Status, {
    //   id: StatusEnum.active,
    // });
    await user.save();
  }

  async forgotPassword(dto: AuthForgotPasswordDto) {
    let user = null;
    if (dto.email) {
      user = await this.usersService.findOneEntity({
        where: {
          email: dto.email,
        },
      });
    }
    if (!user && dto.phone_no) {
      user = await this.usersService.findOneEntity({
        where: {
          phone_no: dto.phone_no,
        },
      });
    }

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'user does not exists',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      let hash = (Math.floor(Math.random() * 10000) + 10000)
        .toString()
        .substring(1);
      hash = await this.checkIfExistHashOrGenerate(hash);
      const forgot = await this.forgotService.findOneEntity({
        where: {
          user: user,
        },
      });
      if (forgot) {
        forgot.hash = hash;
        await forgot.save();
      } else {
        await this.forgotService.saveEntity({
          hash,
          user,
        });
      }
      if (dto.email) {
        return await this.mailService.forgotPassword({
          to: dto.email,
          name: user.first_name + ' ' + user.last_name,
          data: {
            hash,
          },
        });
      } else {
        return await this.smsService.send({
          phone_number:
            user.country_code.toString() + '' + user.phone_no.toString(),
          message:
            'You have requested reset password on Guided App. Please use this code to reset password:' +
            hash,
        });
      }
    }
  }

  async checkIfExistHashOrGenerate(hash) {
    const forgot = await this.forgotService.findOneEntity({
      where: {
        hash: hash,
      },
    });
    if (forgot) {
      hash = (Math.floor(Math.random() * 10000) + 10000)
        .toString()
        .substring(1);
    }
    return hash;
  }

  async resetPassword(
    hash: string,
    password: string,
    phone: number,
  ): Promise<void> {
    let user = null;
    const forgot = await this.forgotService.findOneEntity({
      where: {
        hash,
      },
    });

    if (!forgot) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            hash: `notFound`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    user = forgot.user;
    await this.forgotService.softDelete(forgot.id);
    user.password = password;
    await user.save();
  }

  async me(user: User): Promise<User> {
    return this.usersCrudService.findOneEntity({
      where: {
        id: user.id,
      },
    });
  }

  async switchUserType(
    userType: AuthSwitchUserTypeDto,
    user: User,
  ): Promise<User> {
    const currentUser = await this.usersCrudService.findOneEntity({
      where: {
        id: user.id,
      },
    });

    const uT = await this.userTypeService.findOneEntity({
      where: {
        id: currentUser.user_type_id,
      },
    });
    const userTypes = ['Guide', 'Admin', 'Tourist'];
    if (uT && uT.name && userTypes.includes(userType.user_type)) {
      const newUserType = await this.userTypeService.findOneEntity({
        where: {
          name: userType.user_type,
        },
      });
      currentUser.user_type_id = userType ? newUserType.id : '';
      await currentUser.save();
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            data: 'User Type not found',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.usersCrudService.getOneBase(user.id);
  }

  async update(user: User, userDto: AuthUpdateDto): Promise<User> {
    if (userDto.password) {
      if (userDto.oldPassword) {
        const currentUser = await this.usersCrudService.findOneEntity({
          where: {
            id: user.id,
          },
        });

        const isValidOldPassword = await bcrypt.compare(
          userDto.oldPassword,
          currentUser.password,
        );

        if (!isValidOldPassword) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                oldPassword: 'incorrectOldPassword',
              },
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      } else {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              oldPassword: 'missingOldPassword',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    await this.usersCrudService.saveEntity({
      id: user.id,
      ...userDto,
    });

    return this.usersCrudService.findOneEntity({
      where: {
        id: user.id,
      },
    });
  }

  async softDelete(user: User): Promise<void> {
    await this.usersCrudService.softDelete(user.id);
  }

  async confirmOtp(hash: string) {
    const forgot = await this.forgotService.findOneEntity({
      where: {
        hash,
      },
    });

    if (!forgot) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            hash: `notFound`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return {
      status: HttpStatus.OK,
      sent_data: hash,
      response: {
        data: {
          details: 'Otp Confirmation Successfully',
        },
      },
    };
  }
}
