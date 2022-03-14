import { Controller, Request } from '@nestjs/common';
import { CountryService } from './country.service';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Country } from './country.entity';

@ApiTags('Countries')
@Crud({
  model: {
    type: Country,
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
  path: 'countries',
  version: '1',
})
export class CountryController implements CrudController<Country> {
  constructor(public service: CountryService) {}

  get base(): CrudController<Country> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.delete(request.params.id);
  }
}
