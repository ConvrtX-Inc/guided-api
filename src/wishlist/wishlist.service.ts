import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { Wishlist } from './wishlist.entity';

@Injectable()
export class WishlistService extends TypeOrmCrudService<Wishlist> {
  constructor(
    @InjectRepository(Wishlist)
    private WishlistsRepository: Repository<Wishlist>,
  ) {
    super(WishlistsRepository);
  }

  async findOneEntity(options: FindOptions<Wishlist>) {
    return this.WishlistsRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<Wishlist>) {
    return this.WishlistsRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<Wishlist>[]) {
    return this.WishlistsRepository.save(
      this.WishlistsRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.WishlistsRepository.softDelete(id);
  }

  async hardDelete(id) {
    await this.WishlistsRepository.delete(id);
  }
}
