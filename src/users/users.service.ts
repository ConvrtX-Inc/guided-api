import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UsersCrudService } from './users-crud.service';
import { FileEntity } from '../files/file.entity';
import { FindOptions } from '../utils/types/find-options.type';
import { Waiver } from '../waiver/waiver.entity';
import { UserType } from 'src/user-type/user-type.entity';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
    private userCrudService: UsersCrudService,
  ) {}

  async update(id: string, data: User) {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            id: 'Invalid user id',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!data.password || data.password.length < 6) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'password must be longer than or equal to 6 characters',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = await this.userCrudService.findOneEntity({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const previousPassword = user.password;
    if (previousPassword !== data.password && data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
    }

    await this.usersRepository.update(id, data);
  }

  async updatePhoneNo(id: string, phone_no: number) {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            id: 'Invalid user id',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!phone_no || phone_no < 0) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            phone_no: 'Invalid phone number',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    let user: User = await this.userCrudService.findOneEntity({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            id: 'User not found',
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    user = new User();
    user.id = id;
    user.phone_no = phone_no;

    await this.usersRepository.update(id, user);
  }

  async updateAbout(id: string, about: string) {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            id: 'Invalid user id',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (about && about.length > 5000) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            about: 'About text is too long',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    let user: User = await this.userCrudService.findOneEntity({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            id: 'User not found',
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    user = new User();
    user.id = id;
    user.about = about;

    await this.usersRepository.update(id, user);
  }

  async updatePhoto(id: string, file_id: string) {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            id: 'User id is required',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!file_id) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            about: 'File id is required',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    let user: User = await this.userCrudService.findOneEntity({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            id: 'User not found',
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const file: FileEntity = await this.fileRepository.findOne(file_id);

    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            file_id: 'File not found',
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    user = new User();
    user.id = id;
    user.photo = file;

    await this.usersRepository.update(id, user);
  }

  updateOnline(id: string, online: boolean) {
    return this.usersRepository
      .createQueryBuilder()
      .update()
      .set({ is_online: online })
      .where('id = :id', { id: id })
      .execute();
  }

  updateAsGuide(id: string, is_guide: boolean) {
    return this.usersRepository
      .createQueryBuilder()
      .update()
      .set({ is_guide: is_guide })
      .where('id = :id', { id: id })
      .execute();
  }

  updateAvailability(id: string, is_online: boolean) {
    return this.usersRepository
      .createQueryBuilder()
      .update()
      .set({ is_online: is_online })
      .where('id = :id', { id: id })
      .execute();
  }

  async findOneEntity(options: FindOptions<User>) {
    return this.usersRepository.findOne({
      where: options.where,
    });
  }

  async getUsersByType(type: string) {
    const typeString = type.replace(/\b\w/g, (l) => l.toUpperCase());
    const userType = await getRepository(UserType)
      .createQueryBuilder('usertype')
      .where("usertype.name = '" + typeString + "'")
      .getRawOne();

    console.log(userType);

    if (!userType) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            userType: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (typeString == 'guide') {
      return await this.usersRepository.find({
        where: {
          user_type_id: userType.usertype_id,
          is_traveller: false,
        },
      });
    }

    return await this.usersRepository.find({
      where: { user_type_id: userType.usertype_id },
    });
  }

  async getDefaultPaymentMethod(user_id: string) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .select('id, default_payment_method')
      .where('id::text = :user_id::text', { user_id: user_id })
      .getRawOne();
  }

  async updateDefaultPaymentMethod(user_id: string, dto: UserDto) {
    const user = await this.usersRepository.findOne({
      where: { id: user_id },
    });
    if (user) {
      user.default_payment_method = dto.default_payment_method;
      await user.save();
    }
  }
}
