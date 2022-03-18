import {HttpStatus, Injectable} from '@nestjs/common';
import { Connection, createQueryBuilder, Repository } from 'typeorm';
import { BookingRequest } from './booking-request.entity';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { response } from 'src/utils/response-helper';
import { BookingRequestStatus } from './booking-request-status';
import { Status } from 'src/statuses/status.entity';
import { FindBookingDto } from './booking.dto';

@Injectable()
export class BookingRequestService extends TypeOrmCrudService<BookingRequest> {
  constructor(
    @InjectRepository(BookingRequest)
    private destinationsRepository: Repository<BookingRequest>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    @InjectConnection() private readonly connection: Connection,
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
    //Set to pending status by default
    const status_id = await this.getStatusID(BookingRequestStatus.pending);
    data.status_id = status_id;
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
      where: {
        user_id: user_id,
      },
    });
  }

  async approveRequest(id: string) {
    const request = await this.destinationsRepository.findOne({
      where: { id: id },
    });
    if (request) {
      const status_id = await this.getStatusID(BookingRequestStatus.completed);

      const data = await this.destinationsRepository.save({
        id: id,
        status_id: status_id,
        is_approved: true,
      });
      return response('Request Approved!', data);
    }
  }

  async rejectRequest(id: string) {
    const request = await this.destinationsRepository.findOne({
      where: { id: id },
    });
    if (request) {
      const status_id = await this.getStatusID(BookingRequestStatus.rejected);

      const data = await this.destinationsRepository.save({
        id: id,
        status_id: status_id,
        is_approved: false,
      });

      return response('Request Rejected!', data);
    }
  }

  async getFilteredRequests(user_id: string, status: string) {
    let filteredRequests: BookingRequest[] = [];
    if (status.toLowerCase() !== BookingRequestStatus.all.toLowerCase()) {
      filteredRequests = await createQueryBuilder(BookingRequest, 'booking')
        .leftJoinAndSelect('booking.status', 'status')
        .where('booking.user_id = :user_id', { user_id: user_id })
        .andWhere('LOWER(status.status_name) = LOWER(:status_name)', {
          status_name: status,
        })
        .getMany();
    } else {
      filteredRequests = await this.destinationsRepository.find({
        where: { user_id: user_id },
      });
    }

    return filteredRequests;
  }

  async getStatusID(status: string) {
    let status_id = '';
    const status_data = await this.statusRepository.findOne({
      where: { status_name: status, is_active: true },
    });
    status_id = status_data ? status_data.id : '';

    // Add status if it's not yet existing..
    if (!status_data) {
      const status_data_add = await this.statusRepository.save({
        status_name: status,
        is_active: true,
      });
      status_id = status_data_add ? status_data_add.id : '';
    }

    return status_id;
  }

  async findBookingsRequest(dto: FindBookingDto) {
    try {
      const response = await this.connection.query(
        `SELECT * FROM booking_request WHERE CAST ( booking_date_start AS DATE ) BETWEEN ${dto.first_date} AND ${dto.second_date}`,
      );
      return {
        status: HttpStatus.OK,
        response: {
          data: {
            details: response,
          },
        },
      };
    } catch (e) {
      return {
        status: HttpStatus.BAD_REQUEST,
        response: {
          data: {
            details: 'Something went wrong:' + e.message,
          },
        },
      };
    }
  }
}
