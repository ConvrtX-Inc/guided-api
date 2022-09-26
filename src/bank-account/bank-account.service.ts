import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { FindOptions } from 'src/utils/types/find-options.type';
import {
  Connection,
  getConnection,
  Repository,
  UpdateQuery,
  UpdateQueryBuilder,
} from 'typeorm';
import { BankAccount } from './bank-account.entity';

@Injectable()
export class BankAccountService extends TypeOrmCrudService<BankAccount> {
  constructor(
    @InjectRepository(BankAccount)
    private repository: Repository<BankAccount>,
  ) {
    super(repository);
  }

  async findOneEntity(options: FindOptions<BankAccount>) {
    return this.repository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<BankAccount>) {
    return this.repository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<BankAccount>[]) {
    return this.repository.save(this.repository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
