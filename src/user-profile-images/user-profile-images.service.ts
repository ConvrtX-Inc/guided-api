import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { FindOptions } from 'src/utils/types/find-options.type';
import { Repository } from 'typeorm';
import { UserProfileImage } from './user-profile-image.entity';

@Injectable()
export class UserProfileImagesService extends TypeOrmCrudService<UserProfileImage> {
  constructor(
    @InjectRepository(UserProfileImage)
    private userProfileImagesRepository: Repository<UserProfileImage>,
  ) {
    super(userProfileImagesRepository);
  }

  async findOneEntity(options: FindOptions<UserProfileImage>) {
    return this.userProfileImagesRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<UserProfileImage>) {
    return this.userProfileImagesRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<UserProfileImage>[]) {
    return this.userProfileImagesRepository.save(
      this.userProfileImagesRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.userProfileImagesRepository.softDelete(id);
  }

  async hardDelete(id) {
    await this.userProfileImagesRepository.delete(id);
  }
}