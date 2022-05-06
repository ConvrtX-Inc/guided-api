import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Block } from './entities/block.entity';

@Injectable()
export class BlockService extends TypeOrmCrudService<Block> {
  constructor(
    @InjectRepository(Block)
    private repository: Repository<Block>,
  ){
    super(repository);
  }
  
  async blockUser(blocked: string, blocked_by: string): Promise<void>{
    await this.repository.insert({ blocked, blocked_by });
  }
}
