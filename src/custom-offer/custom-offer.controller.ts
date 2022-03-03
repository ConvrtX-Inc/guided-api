import {
  Controller,  
  UseGuards,
  Post,
  Param,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
  
import { CustomOffer } from './custom-offer.entity';
import { CustomOfferService } from './custom-offer.service';
  
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Custom Offer')
@Crud({
  model: {
    type: CustomOffer,
  },
  routes: {
    exclude: ['getManyBase', 'replaceOneBase', 'createManyBase'],
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
  path: 'custom-offer',
  version: '1',
})
export class CustomOfferController implements CrudController<CustomOffer> {
  constructor(public service: CustomOfferService) {}
  
  get base(): CrudController<CustomOffer> {
    return this;
  }    

  @Post('withdraw/:id')
  @ApiOperation({ summary: 'Withdraw custom offer.' })
  @HttpCode(HttpStatus.OK)
  public async withdrawOffer(@Param('id') id: string) {
    return this.service.withdrawOffer(id);
  }
}
  