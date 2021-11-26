import {
  Controller,
  Request,
} from '@nestjs/common';
import { TermsandconditionsService } from './termsandconditions.service';
import { CreateTermsandconditionDto } from './dto/create-termsandcondition.dto';
import { UpdateTermsandconditionDto } from './dto/update-termsandcondition.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Termsandcondition } from './entities/termsandcondition.entity';

@ApiBearerAuth()
@ApiTags('Terms and Conditions')
@Crud({
  model: {
    type: Termsandcondition,
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
  path: 'termsandconditions',
  version: '1',
})
export class TermsandconditionsController
  implements CrudController<Termsandcondition>
{
  constructor(public service: TermsandconditionsService) {}
  get base(): CrudController<Termsandcondition> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }
}
