import { Controller, Request, UseGuards } from '@nestjs/common';
import { FreeServicesService } from './free-services.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { FreeServices } from './free-services.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Free Services')
@Crud({
  model: {
    type: FreeServices,
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
  path: 'free-services',
  version: '1',
})
export class FreeServicesController implements CrudController<FreeServices> {
  constructor(public service: FreeServicesService) {}

  get base(): CrudController<FreeServices> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }
}
