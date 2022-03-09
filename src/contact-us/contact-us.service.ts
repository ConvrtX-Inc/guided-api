import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { ContactUs } from './contact-us.entity';

@Injectable()
export class ContactUsService extends TypeOrmCrudService<ContactUs> {
  constructor(
    @InjectRepository(ContactUs)
    private contactUsRepository: Repository<ContactUs>    
  ) {
    super(contactUsRepository);
  }

  async findOneEntity(options: FindOptions<ContactUs>) {
    return this.contactUsRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<ContactUs>) {
    return this.contactUsRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<ContactUs>[]) {
    return this.contactUsRepository.save(this.contactUsRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.contactUsRepository.softDelete(id);
  }
 

}
