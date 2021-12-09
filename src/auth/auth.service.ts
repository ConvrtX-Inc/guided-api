import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';
import { AuthEmailLoginDto } from './dtos/auth-email-login.dto';
import { AuthUpdateDto } from './dtos/auth-update.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import * as crypto from 'crypto';
import { AuthProvidersEnum } from './auth-providers.enum';
import { SocialInterface } from 'src/social/interfaces/social.interface';
import { AuthRegisterLoginDto } from './dtos/auth-register-login.dto';
import { UsersCrudService } from '../users/users-crud.service'
import { ForgotService } from 'src/forgot/forgot.service';
import { MailService } from 'src/mail/mail.service';
import { AuthSwitchUserTypeDto } from './dtos/switch-user-type.dto';
import { UserTypeService } from 'src/user-type/userType.service';
import { AuthForgotPasswordDto } from './dtos/auth-forgot-password.dto';
import { VerifyService } from 'src/verify/verify.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private verifyService: VerifyService,
    private usersService: UsersCrudService,
    private userTypeService: UserTypeService,
    private forgotService: ForgotService,
    private mailService: MailService,
  ) {}

  async validateLogin(
    loginDto: AuthEmailLoginDto,
    onlyAdmin: boolean,
  ): Promise<{ token: string; user: User }> {
    const user = await this.usersService.findOneEntity({
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

    if (isValidPassword) {
      const token = await this.jwtService.sign({
        id: user.id,
      });

      //Update is_online status for user
      const updateIsOnline = await this.usersService.updateOnline(
        user.id,
        true,
      );

      return { token, user: user };
    } else {
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
  }

  async validateSocialLogin(
    authProvider: string,
    socialData: SocialInterface,
  ): Promise<{ token: string; user: User }> {
    let user: User;
    const socialEmail = socialData.email?.toLowerCase();

    const userByEmail = await this.usersService.findOneEntity({
      where: {
        email: socialEmail,
      },
    });

    user = await this.usersService.findOneEntity({
      where: {
        socialId: socialData.id,
        provider: authProvider,
      },
    });

    if (user) {
      if (socialEmail && !userByEmail) {
        user.email = socialEmail;
      }
      await this.usersService.saveEntity(user);
    } else if (userByEmail) {
      user = userByEmail;
    } else {
      const userType = await this.userTypeService.findOneEntity({
        where: {
          name: 'Guide',
        },
      });

      user = await this.usersService.saveEntity({
        email: socialEmail,
        first_name: socialData.firstName,
        last_name: socialData.lastName,
        socialId: socialData.id,
        provider: authProvider,
        user_type_id: userType ? userType.id : '',
      });

      user = await this.usersService.findOneEntity({
        where: {
          id: user.id,
        },
      });
    }

    const jwtToken = await this.jwtService.sign({
      id: user.id,
      // role: user.role,
    });

    return {
      token: jwtToken,
      user,
    };
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

    if (userType) {
      userType = await this.userTypeService.findOneEntity({
        where: {
          name: 'Guide',
        },
      });
    }

    const user = await this.usersService.saveEntity({
      ...dto,
      email: dto.email,
      user_type_id: userType ? userType.id : '',
      hash,
    });

    await this.mailService.userSignUp({
      to: user.email,
      name: user.first_name,
      data: {
        hash,
      },
    });
  }

  async confirmEmail(hash: string): Promise<void> {
    const user = await this.usersService.findOneEntity({
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

  async forgotPassword(dto: AuthForgotPasswordDto): Promise<void> {
    let user = null;
    if (dto.email) {
      user = await this.usersService.findOneEntity({
        where: {
          email: dto.email,
        },
      });
    } else {
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
            user: 'user do not exist',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      if (dto.email) {
        const hash = crypto
          .createHash('sha256')
          .update(randomStringGenerator())
          .digest('hex');
        await this.forgotService.saveEntity({
          hash,
          user,
        });
        
        await this.mailService.forgotPassword({
          to: dto.email,
          name: user.first_name,
          data: {
            hash,
          },
        });
      } else {
        const phone = user.country_code + dto.phone_no;
        await this.verifyService.sendPhoneVerificationToken({
          phone_number: phone,
        });
      }
    }
  }

  async resetPassword(
    hash: string,
    password: string,
    phone: number,
  ): Promise<void> {
    let user = null;
    if (phone) {
      user = await this.usersService.findOneEntity({
        where: {
          phone_no: phone,
        },
      });
      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errors: {
              user: `User not found`,
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      try {
        const phoneNumber = '+' + user.country_code + user.phone_no;
        await this.verifyService.CheckPhoneVerificationToken({
          phone_number: phoneNumber,
          verifyCode: hash,
        });
      } catch (e) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errors: {
              msg: `Something went wrong`,
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
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
    }

    user.password = password;
    await user.save();
  }

  async me(user: User): Promise<User> {
    return this.usersService.findOneEntity({
      where: {
        id: user.id,
      },
    });
  }

  async switchUserType(
    userType: AuthSwitchUserTypeDto,
    user: User,
  ): Promise<User> {
    const currentUser = await this.usersService.findOneEntity({
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

    return this.usersService.getOneBase(user.id);
  }

  async update(user: User, userDto: AuthUpdateDto): Promise<User> {
    if (userDto.password) {
      if (userDto.oldPassword) {
        const currentUser = await this.usersService.findOneEntity({
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

    await this.usersService.saveEntity({
      id: user.id,
      ...userDto,
    });

    return this.usersService.findOneEntity({
      where: {
        id: user.id,
      },
    });
  }

  async softDelete(user: User): Promise<void> {
    await this.usersService.softDelete(user.id);
  }
}
