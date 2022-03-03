import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { FindOptions } from 'src/utils/types/find-options.type';
import { Connection, getConnection, Repository } from 'typeorm';
import { Card } from './entities/card.entity';

@Injectable()
export class CardService extends TypeOrmCrudService<Card> {
  constructor(
    @InjectRepository(Card)
    private repository: Repository<Card>,
  ) {
    super(repository);
  }

  async findOneEntity(options: FindOptions<Card>) {
    return this.repository.findOne({
      where: options.where,
    });
  }

  async findManyEntities(options: FindOptions<Card>) {
    return this.repository.find({
      where: options.where,
    });
  }

  async saveOne(data) {
    return await this.saveEntity(data);
  }

  async saveEntity(data: DeepPartial<Card>[]) {
    return this.repository.save(
      this.repository.create(data),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async setDefaultCard(user_id: string, card_id: string) {
    const connect: Connection = getConnection();
    const queryRunner = connect.createQueryRunner();
    queryRunner.connect();

    await queryRunner.startTransaction();
    try { 
      connect.createQueryBuilder(queryRunner)
        .update(Card)
        .set({ is_default: false, updated_date: new Date() })
        .where("user_id = :user_id", { user_id: user_id })
        .execute();
  
      connect.createQueryBuilder(queryRunner)
        .update(Card)
        .set({ is_default: true, updated_date: new Date() })
        .where("id = :card_id", { card_id: card_id })
        .execute();
      await queryRunner.commitTransaction();

    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
