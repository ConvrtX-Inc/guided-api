import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Certificate } from './certificate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions } from '../utils/types/find-options.type';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class CertificateService extends TypeOrmCrudService<Certificate> {
  constructor(
    @InjectRepository(Certificate)
    private destinationsRepository: Repository<Certificate>,
  ) {
    super(destinationsRepository);
  }

  async findOneEntity(options: FindOptions<Certificate>) {
    return this.destinationsRepository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<Certificate>) {
    return this.destinationsRepository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<Certificate>[]) {
    return this.destinationsRepository.save(
      this.destinationsRepository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.destinationsRepository.softDelete(id);
  }
}
