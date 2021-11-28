import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BookingRequest } from './bookingRequest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class BookingRequestService extends TypeOrmCrudService<BookingRequest> {
  constructor(
    @InjectRepository(BookingRequest)
    private destinationsRepository: Repository<BookingRequest>,
  ) {
    super(destinationsRepository);
  }

  async findOneEntity(options: FindOptions<BookingRequest>) {
    return this.destinationsRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<BookingRequest>) {
    return this.destinationsRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<BookingRequest>[]) {
    return this.destinationsRepository.save(
      this.destinationsRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.destinationsRepository.softDelete(id);
  }

  async userBookings(user_id: string) {
    return this.destinationsRepository.find({
      where:  {
        user_id: user_id,
      },
    });
  }
}
