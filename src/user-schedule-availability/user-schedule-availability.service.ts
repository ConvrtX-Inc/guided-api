import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

import { UserScheduleAvailability } from './user-schedule-availability.entity';

@Injectable()
export class UserScheduleAvailabilityService extends TypeOrmCrudService<UserScheduleAvailability> {
  constructor(
    @InjectRepository(UserScheduleAvailability)
    private userScheduleAvailabilityRepository: Repository<UserScheduleAvailability>,    
  ) {
    super(userScheduleAvailabilityRepository);
  }

  async findOneEntity(options: FindOptions<UserScheduleAvailability>) {
    return this.userScheduleAvailabilityRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<UserScheduleAvailability>) {
    return this.userScheduleAvailabilityRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<UserScheduleAvailability>[]) {
    return this.userScheduleAvailabilityRepository.save(this.userScheduleAvailabilityRepository.create(data));
  }


}
