import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FindOptions } from 'src/utils/types/find-options.type';
import { DeepPartial, Repository } from 'typeorm';
import { UserBlockMessages } from './user-message-block.entity';

@Injectable()
export class UserMessagesBlockService extends TypeOrmCrudService<UserBlockMessages>{
    constructor(
        @InjectRepository(UserBlockMessages)
        private userBlockRepository: Repository<UserBlockMessages>) {
          super(userBlockRepository);
      }
      
        async findOneEntity(options: FindOptions<UserBlockMessages>) {
          return this.userBlockRepository.findOne({
            where: options.where,
          });
        }
      
        async findManyEntities(options: FindOptions<UserBlockMessages>) {
          return this.userBlockRepository.find({
            where: options.where,
          });
        }
          
        async saveOne(data) {
          return await this.saveEntity(data);
        }
          
        async saveEntity(data: DeepPartial<UserBlockMessages>[]) {
          return this.userBlockRepository.save(
            this.userBlockRepository.create(data),
          );
        }
}
