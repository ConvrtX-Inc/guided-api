import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOptions } from 'src/utils/types/find-options.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { UserTypeService } from 'src/user-type/userType.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userTypeService: UserTypeService,
  ) {
    super(usersRepository);
  }

  async findOneEntity(options: FindOptions<User>) {
    return this.usersRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<User>) {
    return this.usersRepository.find({
      where: options.where,
    });
  }

  async getOneBase(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });

    user.userType = await this.userTypeService.findOneEntity({
      where: {
        id: user.user_type_id,
      },
    });
    return user;
  }

  async saveEntity(data: DeepPartial<User>) {
    return this.usersRepository.save(this.usersRepository.create(data));
  }

  async softDelete(id: string): Promise<void> {
    await this.usersRepository.softDelete(id);
  }

  async update(id: string, data: User) {
    var user = await this.findOneEntity({
      where: {
        id: id
      }
    });

    if (data.password.length < 6) {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          'password': 'password must be longer than or equal to 6 characters'
        }
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    if (!user) {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          'user': 'notFound'
        }
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    var previousPassword = user.password;
    if (previousPassword !== data.password && data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
    }

    await this.usersRepository.update(id, data);
  }
}
