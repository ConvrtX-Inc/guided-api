import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { FindOptions } from 'src/utils/types/find-options.type';
import { Repository } from 'typeorm';
import { ActivityEventForms } from './activity-event-forms.entity';

@Injectable()
export class ActivityEventFormsService extends TypeOrmCrudService<ActivityEventForms> {
  constructor(
    @InjectRepository(ActivityEventForms)
    private eventRepo: Repository<ActivityEventForms>,
  ) {
    super(eventRepo);
  }

  async findOneEntity(options: FindOptions<ActivityEventForms>) {
    return this.eventRepo.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ActivityEventForms>) {
    return this.eventRepo.find({
      where: options.where,
    });
  }
  async saveEntity(data: DeepPartial<ActivityEventForms>) {
    return this.eventRepo.save(this.eventRepo.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.eventRepo.softDelete(id);
  }
}
