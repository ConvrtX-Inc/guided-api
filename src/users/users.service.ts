import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { UsersCrudService } from './users-crud.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userCrudService: UsersCrudService
  ) {
  }

  async update(id: string, data: User) {
    if (!id) {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          'id': 'Invalid user id'
        }
      }, HttpStatus.UNPROCESSABLE_ENTITY)
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

    var user = await this.userCrudService.findOneEntity({
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

    var previousPassword = user.password;
    if (previousPassword !== data.password && data.password) {
      const salt = await bcrypt.genSalt()
      data.password = await bcrypt.hash(data.password, salt)
    }

    await this.usersRepository.update(id, data)
  }

  async updatePhoneNo(id: string, phone_no: number) {
    
    if (!id) {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          'id': 'Invalid user id'
        }
      }, HttpStatus.UNPROCESSABLE_ENTITY)
    }

    if (!phone_no || phone_no < 0) {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          'phone_no': 'Invalid phone number'
        }
      }, HttpStatus.UNPROCESSABLE_ENTITY)
    }

    let user: User = await this.userCrudService.findOneEntity({
      where: {
        id: id
      }
    })

    if (!user) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          'id': 'User not found'
        }
      }, HttpStatus.NOT_FOUND)
    }

    user = new User()
    user.id = id
    user.phone_no = phone_no

    await this.usersRepository.update(id, user)
  }

  async updateAbout(id: string, about: string) {
    
    if (!id) {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          'id': 'Invalid user id'
        }
      }, HttpStatus.UNPROCESSABLE_ENTITY)
    }

    if (about && about.length > 5000) {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          'about': 'About text is too long'
        }
      }, HttpStatus.UNPROCESSABLE_ENTITY)
    }

    let user: User = await this.userCrudService.findOneEntity({
      where: {
        id: id
      }
    })

    if (!user) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          'id': 'User not found'
        }
      }, HttpStatus.NOT_FOUND)
    }

    user = new User()
    user.id = id
    user.about = about

    await this.usersRepository.update(id, user)
  }

  updateOnline(id: string, online: boolean) {
    return this.usersRepository
      .createQueryBuilder()
      .update()
      .set({ is_online: online })
      .where('id = :id', { id: id })
      .execute();
  }
}
