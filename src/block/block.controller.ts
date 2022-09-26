import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BlockService } from './block.service';
import { Block } from './entities/block.entity';
import { Crud, CrudController, Override } from '@nestjsx/crud';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Block')
@Crud({
  model: {
    type: Block,
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase'],
  },
  query: {
    maxLimit: 50,
    alwaysPaginate: true,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@Controller({
  path: 'block',
  version: '1',
})
export class BlockController implements CrudController<Block> {
  constructor(public service: BlockService) {}

  get base(): CrudController<Block> {
    return this;
  }

  @ApiOperation({ summary: 'Block messages by user id' })
  @Post('get-message/:user_id/:blocked_by')
  @HttpCode(HttpStatus.OK)
  public async blockUser(
    @Param('user_id') blocked: string,
    @Param('blocked_by') blocked_by: string,
  ) {
    return this.service.blockUser(blocked, blocked_by);
  }
}
