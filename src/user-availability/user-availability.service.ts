import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { UserAvailability } from './user-availability.entity';

@Injectable()
export class UserAvailabilityService extends TypeOrmCrudService<UserAvailability> {
  constructor(
    @InjectRepository(UserAvailability)
    private UserAvailabilityRepository: Repository<UserAvailability>,
  ) {
    super(UserAvailabilityRepository);
  }

  async findOneEntity(options: FindOptions<UserAvailability>) {
    return this.UserAvailabilityRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<UserAvailability>) {
    return this.UserAvailabilityRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<UserAvailability>[]) {
    return this.UserAvailabilityRepository.save(
      this.UserAvailabilityRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.UserAvailabilityRepository.softDelete(id);
  }

  async hardDelete(id) {
    await this.UserAvailabilityRepository.delete(id);
  }
}
