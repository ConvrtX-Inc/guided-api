import {
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { Wishlist } from './wishlist.entity';
import { WishlistService } from './wishlist.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Wishlist')
@Crud({
  model: {
    type: Wishlist,
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase'],
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
  path: 'wishlit',
  version: '1'
})
export class WishlistController implements CrudController<Wishlist> {
  constructor(public service: WishlistService) { }

  get base(): CrudController<Wishlist> {
    return this;
  }
}