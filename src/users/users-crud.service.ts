import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { UserTypeService } from '../user-type/user-type.service';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

@Injectable()
export class UsersCrudService extends TypeOrmCrudService<User> {
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

  async findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.usersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }
}
