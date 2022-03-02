import {
  Controller,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LawsAndTaxesService } from './laws-and-taxes.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { LawsAndTaxes } from './laws-and-taxes.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('LawsAndTaxes')
@Crud({
  model: {
    type: LawsAndTaxes,
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase'],
  },
  query: {
    maxLimit: 10,
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
  path: 'laws-and-taxes',
  version: '1',
})
export class LawsAndTaxesController implements CrudController<LawsAndTaxes> {
  constructor(public service: LawsAndTaxesService) {}

  get base(): CrudController<LawsAndTaxes> {
    return this;
  }
}
