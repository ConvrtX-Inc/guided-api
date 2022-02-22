import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

import { UserProfileQuestion } from './user-profile-question.entity';
import { User } from '../users/user.entity';

@Injectable()
export class UserProfileQuestionService extends TypeOrmCrudService<UserProfileQuestion> {
  constructor(
    @InjectRepository(UserProfileQuestion)
    private userProfileQuestionRepository: Repository<UserProfileQuestion>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super(userProfileQuestionRepository);
  }

  async findOneEntity(options: FindOptions<UserProfileQuestion>) {
    return this.userProfileQuestionRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<UserProfileQuestion>) {
    return this.userProfileQuestionRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<UserProfileQuestion>[]) {
    return this.userProfileQuestionRepository.save(this.userProfileQuestionRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.userProfileQuestionRepository.softDelete(id);
  }

  async createOneGuide(data) {
    if(this.userRepository
      .createQueryBuilder()
      .update()
      .set({ first_name: data.first_name, last_name: data.last_name, email: data.email, phone_no: data.phone_no, is_guide: data.is_guide })
      .where('id = :id', { id: data.id })
      .execute()){
      this.userProfileQuestionRepository
        .createQueryBuilder()
        .insert()
        .into(UserProfileQuestion)
        .values(data.user_profile_question)
        .execute();
      }
  }
 
}
