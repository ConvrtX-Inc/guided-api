import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { UserGuideRequest } from './user-guide-request.entity';

@Injectable()
export class UserGuideRequestService extends TypeOrmCrudService<UserGuideRequest> {
  constructor(  
    @InjectRepository(UserGuideRequest)
    private UserGuideRequestRepository: Repository<UserGuideRequest>,
  ) {
    super(UserGuideRequestRepository);
  }

  async findOneEntity(options: FindOptions<UserGuideRequest>) {
    return this.UserGuideRequestRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<UserGuideRequest>) {
    return this.UserGuideRequestRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<UserGuideRequest>[]) {
    return this.UserGuideRequestRepository.save(
      this.UserGuideRequestRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.UserGuideRequestRepository.softDelete(id);
  }

  async hardDelete(id) {
    await this.UserGuideRequestRepository.delete(id);
  }
}
