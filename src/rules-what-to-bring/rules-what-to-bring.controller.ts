import { Controller, UseGuards } from '@nestjs/common';
import { RulesWhatToBringService } from './rules-what-to-bring.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { RulesWhatToBring } from './rules-what-to-bring.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('RulesWhatToBring')
@Crud({
  model: {
    type: RulesWhatToBring,
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
  path: 'rules-what-to-bring',
  version: '1',
})
export class RulesWhatToBringController
  implements CrudController<RulesWhatToBring>
{
  constructor(public service: RulesWhatToBringService) {}

  get base(): CrudController<RulesWhatToBring> {
    return this;
  }
}
