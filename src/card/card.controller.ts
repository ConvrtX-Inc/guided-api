import { Controller, Body, UseGuards, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { CardService } from './card.service';
import { SetDefaultCardDto } from './dto/set-default-card.dto';
import { Card } from './entities/card.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Card')
@Crud({
  model: {
    type: Card,
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase']
  },
  query: {
    maxLimit: 50,
    alwaysPaginate: false,
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
  path: 'card',
  version: '1',
})
export class CardController implements CrudController<Card> {
  constructor(public service: CardService) { }

  get base(): CrudController<Card> {
    return this;
  }

  @ApiOperation({ summary: 'Set card as default payment method' })
  @Post('set-default-card')
  @HttpCode(HttpStatus.OK)
  async setDefaultCard(@Body() dto: SetDefaultCardDto) {
    return this.service.setDefaultCard(dto.user_id, dto.card_id);
  }
}
