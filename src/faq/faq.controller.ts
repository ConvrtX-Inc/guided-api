import { Controller, UseGuards, Request } from '@nestjs/common';
import { FaqService } from './faq.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Faq } from './entities/faq.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('FAQ')
@Crud({
  model: {
    type: Faq,
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
  path: 'faq',
  version: '1',
})
export class FaqController implements CrudController<Faq> {
  constructor(public service: FaqService) {}

  get base(): CrudController<Faq> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }
}
