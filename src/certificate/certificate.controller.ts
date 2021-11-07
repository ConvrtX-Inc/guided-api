import { Controller, Request, UseGuards } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Certificate } from './certificate.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Certificate')
@Crud({
  model: {
    type: Certificate,
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
  path: 'certificates',
  version: '1',
})
export class CertificateController implements CrudController<Certificate> {
  constructor(public service: CertificateService) {}

  get base(): CrudController<Certificate> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }
}
