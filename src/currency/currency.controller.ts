import { Controller, Request, UseGuards } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Currency } from './currency.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Currencies')
@Crud({
  model: {
    type: Currency,
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase', 'deleteOneBase'],
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
  path: 'currencies',
  version: '1',
})
export class CurrencyController implements CrudController<Currency> {
  constructor(public service: CurrencyService) {}

  get base(): CrudController<Currency> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }
}
